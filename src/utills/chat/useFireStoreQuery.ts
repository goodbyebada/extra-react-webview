import { useEffect, useRef, useState } from "react";
import { DocumentData, onSnapshot, Query } from "firebase/firestore";

/**
 *  실시간 채팅을 위한 useFirestoreQuery
 *  변화가 생길 시 새로운 docs를 return 한다.
 * @param query
 * @returns
 */

export function useFirestoreQuery(query: Query<DocumentData>) {
  const [docs, setDocs] = useState<DocumentData[]>([]);
  const queryRef = useRef<Query<DocumentData> | null>(null);

  // Query 객체가 바뀌었을 때만 업데이트
  // TODO query queryRef.current 깊은 비교에서 계속 비교가 안됨
  useEffect(() => {
    if (query !== queryRef.current) {
      queryRef.current = query; // 쿼리 객체를 업데이트
    }
  }, [query]);

  useEffect(() => {
    if (!queryRef) return;
    if (!queryRef.current) return;

    // Firestore 실시간 구독
    const unsubscribe = onSnapshot(queryRef.current, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
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

      setDocs(data);

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

  return docs;
}
