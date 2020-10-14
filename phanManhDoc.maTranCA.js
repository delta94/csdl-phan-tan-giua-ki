function tinhBound(chiSo1, chiSo2) {
    if (maTranAA.length < 1) return 0;

    let chieuCaoCotAA = maTranAA.length;
    let chieuDaiDongAA = maTranAA[0].length;

    if (chiSo1 < 0 || chiSo2 < 0 || chiSo1 >= chieuDaiDongAA || chiSo2 >= chieuDaiDongAA) {
        throw new Exception('Chỉ số nhập vào bị sai ');
    }

    let cot1 = [];
    let cot2 = [];

    let chiSo1TonTai = chiSo1 || chiSo1 === 0;
    let chiSo2TonTai = chiSo2 || chiSo2 === 0;

    if (chiSo1TonTai && chiSo2TonTai) {
        cot1 = maTranAA.map((dong) => dong[chiSo1]);
        cot2 = maTranAA.map((dong) => dong[chiSo2]);
    }

    if (!chiSo1TonTai && chiSo2TonTai) {
        cot1 = new Array(chieuCaoCotAA).fill(0);
        cot2 = maTranAA.map((dong) => dong[chiSo2]);
    }

    if (chiSo1TonTai && !chiSo2TonTai) {
        cot1 = maTranAA.map((dong) => dong[chiSo1]);
        cot2 = new Array(chieuCaoCotAA).fill(0);
    }

    let bound = 0;
    cot1.forEach((cot1Item, indexCot1) => {
        bound += cot1Item * cot2[indexCot1];
    });

    return bound;
}

function tinhCont(chiSo1, chiSo2, chiSo3) {
    return 2 * tinhBound(chiSo1, chiSo2) + 2 * tinhBound(chiSo2, chiSo3) - 2 * tinhBound(chiSo1, chiSo3);
}

function tinhMaxCont(mangChiSoCoDinh, chiSoCanTinh) {
    let mangChiSoTam = [null, ...mangChiSoCoDinh, null];
    let contLonNhat = 0;
    let chiSoLonNhat = 0;

    for (let chiSo = 2; chiSo < mangChiSoTam; chiSo += 1) {
        let contTinhToan = tinhCont(chiSo - 1, chiSoCanTinh, chiSo);

        if (contTinhToan > contLonNhat) {
            contLonNhat = contTinhToan;
            chiSoLonNhat = chiSo;
        }
    }

    chiSoLonNhat = chiSoLonNhat - 1;

    return chiSoLonNhat;
}

function tinhChiSoMaTranCA() {
    if (maTranAA.length < 1) return [];

    let mangChiSo = [0, 1];

    for (let chiso = 2; chiso < maTranAA[0].length; chiso += 1) {
        let chiSoLonNhat = tinhMaxCont(mangChiSo, chiso);

        mangChiSo = mangChiSo.slice(0, chiSoLonNhat).concat([chiso]).concat(mangChiSo.slice(chiSoLonNhat));
    }

    return mangChiSo;
}

function tinhToanMaTranCA() {
    if (maTranAA.length < 1) return;

    mangChiSoMaTranCA = tinhChiSoMaTranCA();

    maTranCA = new Array(maTranAA.length).fill('').map((_, indexDongCA) => new Array(mangChiSoMaTranCA.length).fill('').map((_, indexCotCA) => maTranAA[indexDongCA][mangChiSoMaTranCA[indexCotCA]]));

    goiSuKien(khiThayDoi_maTranCA);
}

$(document).ready(function () {
    themSuKien(khiThayDoi_maTranCA, 'thayDoi.htmlMaTranCA', function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranCA'), maTranCA, 'A', 'A');
    });

    $('#phanManhDoc .tinhLaiMaTranCA').click(function () {
        tinhToanMaTranCA();
        goiSuKien(khiThayDoi_maTranCA);
    });

    $('#phanManhDoc .ghiMaTranCA').click(function () {
        if (maTranCA.length < 1) return;
        maTranCA = layThongTinTrenMaTran($('#phanManhDoc .maTranCA'), maTranCA.length, maTranCA[0].length);
        goiSuKien(khiThayDoi_maTranCA);
    });
    $('#phanManhDoc .lamMoiMaTranCA').click(function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranCA'), maTranCA, 'A', 'A');
    });
});
