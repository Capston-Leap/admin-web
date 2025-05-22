import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axiosInstance";

const AdminPolicyDetail = () => {
    const { informationId } = useParams();
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        axios
            .get(`/admin/information/${informationId}`)
            .then((res) => setDetail(res.data))
            .catch((err) => {
                console.error("상세 조회 실패", err);
            });
    }, [informationId]);

    if (!detail) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>자립지원상세 정보</h2>
            <p>카테고리: {detail.category}</p>
            <p>제목: {detail.title}</p>
            <p>내용: {detail.content}</p>
            <p>
                URL:{" "}
                <a href={detail.url} target="_blank" rel="noreferrer">
                    {detail.url}
                </a>
            </p>
        </div>
    );
};

export default AdminPolicyDetail;
