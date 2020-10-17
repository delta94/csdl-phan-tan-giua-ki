//Các biến
let soPhanTuQ = 0;
let soPhanTuA = 0;
let soPhanTuS = 0;

let maTranUSE = [];
let maTranACC = [];
let maTranREF = [];

let maTranAA = [];

let maTranCA = [];
let mangChiSoMaTranCA = [];
let tinhToanMaTranCAHtml = ``;

let indexRanhGioiMaTranPhanManhDoc = 0;
maTranPhanManhDocStyle = [];
let tinhToanMaTranPhanManhDocHtml = ``;

//Các mảng sự kiện
let khiThayDoi_soPhanTuQ = [];
let khiThayDoi_soPhanTuA = [];
let khiThayDoi_soPhanTuS = [];

let khiThayDoi_maTranUSE = [];
let khiThayDoi_maTranACC = [];
let khiThayDoi_maTranREF = [];
let khiThayDoi_maTranAA = [];
let khiThayDoi_maTranCA = [];
let khiThayDoi_maTranPhanManhDoc = [];

//Các hàm xử lí sự kiện
let goiSuKien = (mangSuKien, thisArg, ...thamSo) => {
    mangSuKien.forEach((suKien) => {
        suKien.hamThucThi.apply(thisArg, thamSo);
    });
};

let themSuKien = (mangSuKien, ten, hamThucThi) => {
    mangSuKien.push({ ten: ten, hamThucThi: hamThucThi });
};

let xoaSuKien = (mangSuKien, ten) => {
    mangSuKien = mangSuKien.filter((suKien) => suKien.ten != ten);
};

//Thao tác với ma trận
function thayDoiCacDongMaTran(maTran, soDongMoi, soCot, suKien, themMoi = 0) {
    let soDongCu = maTran.length;
    if (soDongMoi < soDongCu) {
        let soDongBo = soDongCu - soDongMoi;
        for (let i = 0; i < soDongBo; i += 1) {
            maTran.pop();
        }
        goiSuKien(suKien);
    } else if (soDongMoi > soDongCu) {
        let soDongThem = soDongMoi - soDongCu;
        for (let i = 0; i < soDongThem; i += 1) {
            let dongMoi = new Array(soCot).fill(themMoi);
            maTran.push(dongMoi);
        }
        goiSuKien(suKien);
    }
}

function thayDoiCacCotMaTran(maTran, soCotMoi, suKien, themMoi = 0) {
    if (maTran.length > 0) {
        let soCotCu = maTran[0].length;
        if (soCotMoi < soCotCu) {
            maTran.forEach((dong, index) => {
                maTran[index] = dong.slice(0, soCotMoi);
            });
            goiSuKien(suKien);
        } else if (soCotMoi > soCotCu) {
            let soCotHon = soCotMoi - soCotCu;
            maTran.forEach((dong, index) => {
                maTran[index] = dong.concat(new Array(soCotHon).fill(themMoi));
            });
            goiSuKien(suKien);
        }
    }
}

function taoHtmlMaTran(maTran, tenDong, tenCot, maTranStyle) {
    let mangTenDong = [];
    let mangTenCot = [];

    let htmlMaTranUSE = ``;
    if (maTran.length > 0) {
        let soCot = maTran[0].length;

        if (typeof tenDong == 'string') {
            mangTenDong = new Array(maTran.length).fill(tenDong).map((tenDong, indexTenDong) => `${tenDong}${indexTenDong}`);
        }

        if (typeof tenCot == 'string') {
            mangTenCot = new Array(maTran[0].length).fill(tenCot).map((tenCot, indexTenCot) => `${tenCot}${indexTenCot}`);
        }

        if (Array.isArray(tenDong)) {
            mangTenDong = tenDong;
        }

        if (Array.isArray(tenCot)) {
            mangTenCot = tenCot;
        }

        htmlMaTranUSE += `<thead><tr><th><input class="w-100 h-100 p-0 bg-transparent" readonly/></th>${mangTenCot.map((tenMotCot) => `<th>${tenMotCot}</th>`).join('')}</tr></thead>`;

        htmlMaTranUSE += `<tbody>${maTran.map((dong, indexDong) => `<tr><th>${mangTenDong[indexDong]}</th>${dong.map((duLieu, indexCot) => `<td><input class="w-100 h-100 p-0 bg-transparent" type="number" step="1" indexDong="${indexDong}" indexCot="${indexCot}" value="${duLieu}" ${maTranStyle && maTranStyle[indexDong] && maTranStyle[indexDong][indexCot] ? `style="${maTranStyle[indexDong][indexCot]}"` : ``}></td>`).join('')}</tr>`).join('')}</tbody>`;
    }
    return htmlMaTranUSE;
}

function thayDoiHtmlMaTran(selectorMaTran, maTran, tenDong, tenCot, maTranStyle) {
    let htmlMaTranUSE = taoHtmlMaTran(maTran, tenDong, tenCot, maTranStyle);
    $(selectorMaTran).html(htmlMaTranUSE);
}

function xoaSuKienThayDoiTextbox(selectorMaTran) {
    $(selectorMaTran).find('input').unbind('change');
}

function themSuKienThayDoiTextbox(selectorMaTran, maTran) {
    $(selectorMaTran)
        .find('input')
        .change(function () {
            let duLieuMoi = parseInt($(this).val());
            let indexDong = $(this).attr('indexDong');
            let indexCot = $(this).attr('indexCot');
            maTran[indexDong][indexCot] = duLieuMoi;
        });
}

function nhapNgauNhienMaTran(maTran, soNhoNhat, soLonNhat, suKien) {
    let chenhLech = soLonNhat - soNhoNhat + 1;
    maTran.forEach((dong, dongIndex) => {
        maTran[dongIndex] = dong.map((_) => Math.floor(Math.random() * chenhLech + soNhoNhat));
    });
    goiSuKien(suKien);
}

function nhapNgauNhienMaTran(maTran, tuyChonNgauNhien, suKien) {
    let mangIndex = [];
    let phanTramNhoNhat = tuyChonNgauNhien[0].phanTram;
    tuyChonNgauNhien.forEach((tuyChon) => (phanTramNhoNhat = tuyChon.phanTram < phanTramNhoNhat ? tuyChon.phanTram : phanTramNhoNhat));
    tuyChonNgauNhien.forEach((tuyChon) => (mangIndex = mangIndex.concat(new Array(Math.floor(tuyChon.phanTram / phanTramNhoNhat)).fill(tuyChon.giaTri))));

    maTran.forEach((dong, dongIndex) => {
        maTran[dongIndex] = dong.map((_) => mangIndex[Math.floor(Math.random() * mangIndex.length)]);
    });
    goiSuKien(suKien);
}

function caiLaiMaTran(maTran, giaTriChung, suKien) {
    if (maTran.length > 0) {
        maTran.forEach((dong, indexDong) => dong.forEach((_, indexCot) => (maTran[indexDong][indexCot] = giaTriChung)));
        goiSuKien(suKien);
    }
}

function layThongTinTrenMaTran(selectorMaTran, soDong, soCot) {
    return new Array(soDong).fill('').map((_, indexDong) => new Array(soCot).fill('').map((_, indexCot) => parseInt($(selectorMaTran).find(`input[indexDong="${indexDong}"][indexCot="${indexCot}"]`).val())));
}

function xuatMaTranThanhJson() {
    return JSON.stringify({
        maTranUSE: maTranUSE,
        maTranACC: maTranACC,
        maTranREF: maTranREF,

        soPhanTuQ: soPhanTuQ,
        soPhanTuA: soPhanTuA,
        soPhanTuS: soPhanTuS,
    });
}

function nhapMaTranTuJson(jsonString) {
    let jsonObject = JSON.parse(jsonString);

    soPhanTuQ = jsonObject.soPhanTuQ;
    soPhanTuA = jsonObject.soPhanTuA;
    soPhanTuS = jsonObject.soPhanTuS;

    goiSuKien(khiThayDoi_soPhanTuQ);
    goiSuKien(khiThayDoi_soPhanTuA);
    goiSuKien(khiThayDoi_soPhanTuS);

    maTranUSE = jsonObject.maTranUSE;
    maTranACC = jsonObject.maTranACC;
    maTranREF = jsonObject.maTranREF;

    goiSuKien(khiThayDoi_maTranUSE);
    goiSuKien(khiThayDoi_maTranACC);
    goiSuKien(khiThayDoi_maTranREF);
}

$(document).ready(function () {});
