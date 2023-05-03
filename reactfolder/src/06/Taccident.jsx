import Tdata from "./dataTaccident.json"
import Taccident1 from "./Taccident1"
import Taccident2 from "./Taccident2"
import { useState, useEffect } from "react"

const Taccident = function () {
    const data = Tdata.data
    let category1 = []
    for (let i = 0; i < data.length; i++) {
        // if (category1.indexOf(data[i].사고유형_대분류) == -1) {
        //     category1.push(data[i].사고유형_대분류)
        // }
        category1.push(data[i].사고유형_대분류)
    }
    // Set 객체 생성 -> 중복값 제거됨
    category1 = new Set(category1)  // Object
    category1 = [...category1]      // Array

    const category2 = data.map(item => [item.사고유형_대분류, item.사고유형_중분류])
    // for (let i = 0; i < data.length; i++) {
    //     category2.push(data[i].사고유형_대분류 + ", " + data[i].사고유형_중분류)
    // }

    const [sel1, setSel1] = useState(0)
    const [sel2, setSel2] = useState([])
    const [selData, setSelData] = useState({});
    const [viewTag, setviewTag] = useState('');

    useEffect(() => {
        if (sel2 !== undefined) {
            let temp = data.filter((item) =>
                item.사고유형_대분류 === sel2[0] && item.사고유형_중분류 === sel2[1])
            setSelData(temp[0]);
            console.log(temp[0])
        }

    }, [data, sel2]);

    useEffect(() => {
        if (selData !== undefined && Object.keys(selData).length !== 0) {
            const vkey = ["사고건수", "사망자수", "중상자수", "경상자수", "부상신고자수"]
            let ttag = vkey.map((k) =>
                <div key={k} className='grid'>
                    <span>{k}</span>
                    <span>{parseInt(selData[k]).toLocaleString()}</span>
                </div>
            );

            setviewTag(ttag);
        }
    }, [selData]);
    return (
        <main className="container">
            <article>
                {/* 사용자 태그(컴포넌트) 끼우기 변수랑 함수 넘기기*/}
                <Taccident1 c1={category1} setSel1={setSel1} />
                <Taccident2 c2={category2} sel1={sel1} setSel2={setSel2} />
            </article>
            <article>
                {viewTag}
            </article>
        </main>
    )
}
export default Taccident