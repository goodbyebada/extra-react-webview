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

        const newData = doc.data();
        if (!newData.created_at) {
          return {
            ...newData,
            id: Number(doc.id),
            created_at: new Date(),
          };
        }

        return {
          ...newData,
          id: Number(doc.id),
        };
      });

      // NOTE 추가되면 새로 불러오는건가? TEST 필요
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

    const nextQuery = query(
      colloectionRef,
      orderBy("created_at", "desc"),
      startAfter(lastVisible),
      limit(limitCount),
    );

    const unsubscribe = onSnapshot(nextQuery, (snapshot) => {
      const newData = snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: Number(doc.id),
        }))
        .reverse();

      setDocs((prevDocs) => [...newData, ...prevDocs]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    });

    return unsubscribe;
  };

  return { docs, fetchMore };
}
