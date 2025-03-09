import { useEffect, useRef, useState } from "react";
import {
  CollectionReference,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  startAfter,
} from "firebase/firestore";

/**
 *  실시간 채팅을 위한 useFirestoreQuery
 *  변화가 생길 시 새로운 docs를 return 한다.
 * @param colloectionRef
 * @returns
 */

export function useFirestoreQuery(
  colloectionRef: CollectionReference<DocumentData, DocumentData>,
  limitCount: number,
) {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const queryRef = useRef<Query<DocumentData> | null>(null);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);

  // Query 객체가 바뀌었을 때만 업데이트
  // TODO query queryRef.current 깊은 비교에서 계속 비교가 안됨
  useEffect(() => {
    const q = query(
      colloectionRef,
      orderBy("created_at", "desc"),
      limit(limitCount),
    );

    if (q !== queryRef.current) {
      queryRef.current = q; // 쿼리 객체를 업데이트
    }
  }, [colloectionRef]);

  useEffect(() => {
    if (!queryRef) return;
    if (!queryRef.current) return;

    // Firestore 실시간 구독
    const unsubscribe = onSnapshot(queryRef.current, (snapshot) => {
      const data = snapshot.docs.map((doc, key) => {
        if (key === snapshot.docs.length - 1) {
          setLastVisible(doc);
        }

        // 파이어베이스 serverTime이 서버에 저장될때 딜레이가 있어 createed_at이 undefined일 수 있다
        const newData = doc.data();
        if (!newData.created_at) {
          return {
            ...newData,
            id: doc.id,
            created_at: new Date(),
          };
        }

        return {
          ...newData,
          id: doc.id,
        };
      });

      setDocs(data.reverse());

      // TODO 추후 삭제, 수정 , 구현 예정
      // snapshot.docChanges().forEach((change) => {
      // if (change.type === "added") {
      //   if (!change.doc.data().created_at)
      //     console.log("New : ", change.doc.data());
      // }
      // if (change.type === "modified") {
      //   console.log("Modified : ", change.doc.data());
      // }
      // if (change.type === "removed") {
      //   console.log("Removed : ", change.doc.data());
      // }
    });

    return () => unsubscribe();
  }, []);

  const fetchMore = () => {
    console.log("fetchMore");
    if (!lastVisible) return;

    // 최신순으로 limitCount 개만큼 가져온다.
    const nextQuery = query(
      colloectionRef,
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(limitCount),
    );

    const unsubscribe = onSnapshot(nextQuery, (snapshot) => {
      // 오름차순으로 정렬 (과거순)
      const fetchedOldDocs = snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .reverse();

      // 오름차순으로 정렬 (과거순)
      // fetchedOldData(더 과거의 데이터), ...이전의 데이터 리스트
      setDocs((prevDocs) => [...fetchedOldDocs, ...prevDocs]);

      // 가장 오래된 데이터
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    });

    return unsubscribe;
  };

  return { docs, fetchMore };
}
