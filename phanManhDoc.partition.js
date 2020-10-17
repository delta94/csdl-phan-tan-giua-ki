function tinhTapQ() {
    return new Array(soPhanTuQ).fill('').map((_, index) => index);
}

function tinhTapAQ() {
    return maTranUSE.map((dong) =>
        dong
            .map((duLieu, indexCot) => {
                return { indexCot, duLieu };
            })
            .filter((duLieu) => duLieu.duLieu == 1)
            .map((duLieu) => duLieu.indexCot)
    );
}

function tinhTapTA(indexDongCA) {
    let tapTA = [];
    for (let i = 0; i <= indexDongCA; i += 1) tapTA.push(mangChiSoMaTranCA[i]);
    return tapTA;
}

function tinhTapBA(indexDongCA, maTranCALength) {
    let tapBA = [];
    for (let i = indexDongCA + 1; i < maTranCALength; i += 1) tapBA.push(mangChiSoMaTranCA[i]);
    return tapBA;
}

function tinhTapTQ(tapAQ, tapTA) {
    let tapTQ = [];
    tapAQ.forEach((dongAQ, indexDongAQ) => {
        let laCon = true;
        for (let indexCot = 0; indexCot < dongAQ.length; indexCot += 1) {
            let duLieu = dongAQ[indexCot];
            if (tapTA.find((ta) => ta == duLieu) == undefined) {
                laCon = false;
                break;
            }
        }
        if (laCon) tapTQ.push(indexDongAQ);
    });
    return tapTQ;
}

function tinhTapBQ(tapAQ, tapBA) {
    let tapBQ = [];
    tapAQ.forEach((dongAQ, indexDongAQ) => {
        let laCon = true;
        for (let indexCot = 0; indexCot < dongAQ.length; indexCot += 1) {
            let duLieu = dongAQ[indexCot];
            if (tapBA.find((ba) => ba == duLieu) == undefined) {
                laCon = false;
                break;
            }
        }
        if (laCon) tapBQ.push(indexDongAQ);
    });
    return tapBQ;
}

function tinhTapOQ(tapQ, tapTQ, tapBQ) {
    let tapOQ = [];
    tapQ.forEach((q) => {
        if (tapTQ.find((tq) => tq == q) == undefined && tapBQ.find((bq) => bq == q) == undefined) {
            tapOQ.push(q);
        }
    });
    return tapOQ;
}

function tinhC_Q(tap_Q) {
    let duLieuC_Q = 0;

    let htmlTinhToanChiTiet = [];
    let htmlTinhToanThaySo = [];

    tap_Q.forEach((_Q) => {
        let dong = maTranUSE[_Q];
        let soCot1 = 0;
        for (let indexCot = 0; indexCot < dong.length; indexCot += 1) {
            let duLieu = dong[indexCot];
            if (duLieu == 1) soCot1 += 1;
            if (soCot1 > 1) break;
        }

        if (soCot1 > 1) {
            let duLieuNhan = 0;
            maTranACC[_Q].forEach((duLieuACC, indexCotACC) => {
                duLieuNhan += duLieuACC * maTranREF[_Q][indexCotACC];

                htmlTinhToanChiTiet.push(`q${_Q}A${indexCotACC} x ${maTranREF[_Q][indexCotACC]}`);
                htmlTinhToanThaySo.push(`${duLieuACC} x ${maTranREF[_Q][indexCotACC]}`);
            });
            duLieuC_Q += duLieuNhan;
        }
    });

    tinhToanMaTranPhanManhDocHtml += `<ul><li> = ${htmlTinhToanChiTiet.join(' + ')}</li><li> = ${htmlTinhToanThaySo.join(' + ')}</li></ul>`;

    return duLieuC_Q;
}

function taoMaTranStyleChiaPhanManhDoc(indexRanhGioi) {
    let maTran = new Array(maTranCA.length).fill('').map((_, indexDong) =>
        new Array(maTranCA.length).fill('').map((_, indexCot) => {
            let style = ``;

            if (indexDong == indexRanhGioi) {
                style += `border-bottom: 3px solid red; `;
            }

            if (indexCot == indexRanhGioi) {
                style += `border-right: 3px solid red; `;
            }

            return style;
        })
    );
    return maTran;
}

function taoHienThiTaBa(_A) {
    let hienThi = [];
    for (let i = 0; i < _A.length; i += 1) {
        hienThi.push(`A${_A[i]}`);
    }
    return hienThi.join(', ');
}

function taoHienThi_Q(_Q) {
    let hienThi = [];
    for (let i = 0; i < _Q.length; i += 1) {
        hienThi.push(`q${_Q[i]}`);
    }
    return hienThi.join(', ');
}

function tinhToanMaTranPhanManhDoc() {
    tinhToanMaTranPhanManhDocHtml = ``;
    tinhToanMaTranPhanManhDocHtml += `<ul>`;

    let tapQ = tinhTapQ();
    tinhToanMaTranPhanManhDocHtml += `<li>Tập q là: Q = { ${tapQ.map((q) => `q${q}`).join(', ')} }</li>`;

    let tapAQ = tinhTapAQ();
    tinhToanMaTranPhanManhDocHtml += `<li>Tập AQ: <ul>${tapAQ.map((aq, indexAq) => `<li>AQ(q${indexAq}) = { ${aq.map((aqItem) => `A${aqItem}`).join(', ')} } </li>`).join('')}</ul></li>`;

    let maxZ = 0;
    let maxIndexRanhGioi = 0;

    tinhToanMaTranPhanManhDocHtml += `<li>Xét các cách phân hoạch:`;
    tinhToanMaTranPhanManhDocHtml += `<ul>`;

    for (let indexDongCA = maTranCA.length - 2; indexDongCA >= 0; indexDongCA -= 1) {
        tinhToanMaTranPhanManhDocHtml += `<li>Xét cách phân hoạch:`;
        tinhToanMaTranPhanManhDocHtml += `<table class="table table-hovered table-bordered table-striped">`;
        tinhToanMaTranPhanManhDocHtml += taoHtmlMaTran(
            maTranCA,
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`),
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`),
            taoMaTranStyleChiaPhanManhDoc(indexDongCA)
        );
        tinhToanMaTranPhanManhDocHtml += `</table>`;

        tinhToanMaTranPhanManhDocHtml += `<div>Ta có: </div>`;

        tinhToanMaTranPhanManhDocHtml += `<ul>`;

        let tapTA = tinhTapTA(indexDongCA);
        tinhToanMaTranPhanManhDocHtml += `<li>Tập TA: ${taoHienThiTaBa(tapTA)}</li>`;

        let tapBA = tinhTapBA(indexDongCA, maTranCA.length);
        tinhToanMaTranPhanManhDocHtml += `<li>Tập BA: ${taoHienThiTaBa(tapBA)}</li>`;

        let tapTQ = tinhTapTQ(tapAQ, tapTA);
        tinhToanMaTranPhanManhDocHtml += `<li>Tập TQ (Nếu AQ[qi] là con của TA thì cho qi vào tập): ${taoHienThi_Q(tapTQ)}</li>`;

        let tapBQ = tinhTapBQ(tapAQ, tapBA);
        tinhToanMaTranPhanManhDocHtml += `<li>Tập BQ (Nếu AQ[qi] là con của BA thì cho qi vào tập): ${taoHienThi_Q(tapBQ)}</li>`;

        let tapOQ = tinhTapOQ(tapQ, tapTQ, tapBQ);
        tinhToanMaTranPhanManhDocHtml += `<li>Tập OQ (Là kết quả của phép toán trên tập Q - TQ - BQ): ${taoHienThi_Q(tapOQ)}</li>`;

        tinhToanMaTranPhanManhDocHtml += `<li>`;
        let CTQ = tinhC_Q(tapTQ);
        tinhToanMaTranPhanManhDocHtml += `</li>`;

        tinhToanMaTranPhanManhDocHtml += `<li>`;
        let CBQ = tinhC_Q(tapBQ);
        tinhToanMaTranPhanManhDocHtml += `</li>`;

        tinhToanMaTranPhanManhDocHtml += `<li>`;
        let COQ = tinhC_Q(tapOQ);
        tinhToanMaTranPhanManhDocHtml += `</li>`;

        let Z = CTQ * CBQ - COQ ** 2;
        tinhToanMaTranPhanManhDocHtml += `<li>Z = CTQ x CBQ - COQ<sup>2</sup> = ${CTQ} x ${CBQ} - ${COQ}<sup>2</sup> = ${Z} </li>`;

        tinhToanMaTranPhanManhDocHtml += `</ul>`;

        if (Z > maxZ) {
            maxZ = Z;
            maxIndexRanhGioi = indexDongCA;
        }
    }

    indexRanhGioiMaTranPhanManhDoc = maxIndexRanhGioi;

    maTranPhanManhDocStyle = new Array(maTranCA.length).fill('').map((_, indexDong) =>
        new Array(maTranCA.length).fill('').map((_, indexCot) => {
            let style = ``;

            if (indexDong == indexRanhGioiMaTranPhanManhDoc) {
                style += `border-bottom: 3px solid red; `;
            }

            if (indexCot == indexRanhGioiMaTranPhanManhDoc) {
                style += `border-right: 3px solid red; `;
            }

            return style;
        })
    );

    console.table(maTranPhanManhDocStyle);

    tinhToanMaTranPhanManhDocHtml += `</ul>`;
    tinhToanMaTranPhanManhDocHtml += `</li>`;
    tinhToanMaTranPhanManhDocHtml += `</ul>`;
}

$(document).ready(function () {
    themSuKien(khiThayDoi_maTranPhanManhDoc, 'thayDoi.htmlMaTranPhanManhDoc', function () {
        thayDoiHtmlMaTran(
            $('#phanManhDoc .maTranPhanManhDoc'),
            maTranCA,
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`),
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`),
            maTranPhanManhDocStyle
        );

        $('#phanManhDoc .xuLyMaTranPhanManhDoc .tinhToanMaTranPhanManhDoc').html(tinhToanMaTranPhanManhDocHtml);
    });

    themSuKien(khiThayDoi_maTranCA, 'thayDoi.htmlMaTranPhanManhDoc', function () {
        tinhToanMaTranPhanManhDoc();
        goiSuKien(khiThayDoi_maTranPhanManhDoc);
    });

    $('#phanManhDoc .tinhLaiMaTranPhanManhDoc').click(function () {
        tinhToanMaTranPhanManhDoc();
        goiSuKien(khiThayDoi_maTranPhanManhDoc);
    });
    $('#phanManhDoc .lamMoiMaTranPhanManhDoc').click(function () {
        thayDoiHtmlMaTran(
            $('#phanManhDoc .maTranPhanManhDoc'),
            maTranCA,
            mangChiSoMaTranPhanManhDoc.map((chiSo) => `A${chiSo}`),
            mangChiSoMaTranPhanManhDoc.map((chiSo) => `A${chiSo}`),
            maTranPhanManhDocStyle
        );
    });
});
