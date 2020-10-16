function tinhBound(chiSo1, chiSo2) {
    if (maTranAA.length < 1) return 0;

    let chieuCaoCotAA = maTranAA.length;
    let chieuDaiDongAA = maTranAA[0].length;

    if (chiSo1 < 0 || chiSo2 < 0) {
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

    tinhToanMaTranCAHtml += `<li> = ${cot1.map((_, indexCot1) => `A${chiSo1}A${indexCot1} x A${chiSo2}A${indexCot1}`).join(' + ')}</li>`;
    tinhToanMaTranCAHtml += `<li> = ${cot1.map((cot1Item, indexCot1) => `${cot1Item} x ${cot2[indexCot1]}`).join(' + ')}</li>`;

    let bound = 0;
    cot1.forEach((cot1Item, indexCot1) => {
        bound += cot1Item * cot2[indexCot1];
    });

    tinhToanMaTranCAHtml += `<li> = ${bound}</li>`;

    return bound;
}

function tinhCont(chiSo1, chiSo2, chiSo3) {
    tinhToanMaTranCAHtml += '<li>Tính Bound từng cặp:';
    tinhToanMaTranCAHtml += '<ul>';

    tinhToanMaTranCAHtml += `<li>Tính Bound của cặp ${[chiSo1, chiSo2].map((item) => `A${item}`).join(', ')}: Bound(${[chiSo1, chiSo2].map((item) => `A${item}`).join(', ')})<ul style="list-style-type: none;">`;
    let bound12 = tinhBound(chiSo1, chiSo2);
    tinhToanMaTranCAHtml += '</ul></li>';

    tinhToanMaTranCAHtml += `<li>Tính Bound của cặp ${[chiSo2, chiSo3].map((item) => `A${item}`).join(', ')}: Bound(${[chiSo2, chiSo3].map((item) => `A${item}`).join(', ')})<ul style="list-style-type: none;">`;
    let bound23 = tinhBound(chiSo2, chiSo3);
    tinhToanMaTranCAHtml += '</ul></li>';

    tinhToanMaTranCAHtml += `<li>Tính Bound của cặp ${[chiSo1, chiSo3].map((item) => `A${item}`).join(', ')}: Bound(${[chiSo1, chiSo3].map((item) => `A${item}`).join(', ')})<ul style="list-style-type: none;">`;
    let bound13 = tinhBound(chiSo1, chiSo3);
    tinhToanMaTranCAHtml += '</ul></li>';

    tinhToanMaTranCAHtml += '</ul>';
    tinhToanMaTranCAHtml += '</li>';

    let cont = 2 * bound12 + 2 * bound23 - 2 * bound13;

    tinhToanMaTranCAHtml += '<li>Tính count: Cont(' + [chiSo1, chiSo2, chiSo3].map((item) => `A${item}`).join(', ') + ') <ul style="list-style-type: none;"><li>= 2 x Bound(' + [chiSo1, chiSo2].map((item) => `A${item}`).join(', ') + ') + 2 x Bound(' + [chiSo2, chiSo3].map((item) => `A${item}`).join(', ') + ') - 2 x Bound(' + [chiSo1, chiSo3].map((item) => `A${item}`).join(', ') + ')</li><li>= 2 x ' + bound12 + ' + 2 x ' + bound23 + ' - 2 x ' + bound13 + '</li><li>= ' + cont + '</li></ul></li>';
    return cont;
}

function tinhMaxCont(mangChiSoCoDinh, chiSoCanTinh) {
    let mangChiSoTam = [null, ...mangChiSoCoDinh, null];
    let contLonNhat = 0;
    let chiSoLonNhat = 0;

    tinhToanMaTranCAHtml += '<ul>Tính Cont của từng bộ ba: ';

    for (let chiSo = 1; chiSo < mangChiSoTam.length; chiSo += 1) {
        tinhToanMaTranCAHtml += `<li>Tính Cont của bộ ${[mangChiSoTam[chiSo - 1], chiSoCanTinh, mangChiSoTam[chiSo]].map((item) => `A${item}`).join(', ')}: `;
        tinhToanMaTranCAHtml += `<ul>`;
        let contTinhToan = tinhCont(mangChiSoTam[chiSo - 1], chiSoCanTinh, mangChiSoTam[chiSo]);
        tinhToanMaTranCAHtml += '</ul>';
        tinhToanMaTranCAHtml += '</li>';

        if (contTinhToan > contLonNhat) {
            contLonNhat = contTinhToan;
            chiSoLonNhat = chiSo;
        }
    }

    chiSoLonNhat = chiSoLonNhat - 1;

    tinhToanMaTranCAHtml += '</ul>';

    return chiSoLonNhat;
}

function tinhChiSoMaTranCA() {
    if (maTranAA.length < 1) return [];

    tinhToanMaTranCAHtml += '<ul>';
    let mangChiSo = [0, 1];
    tinhToanMaTranCAHtml += `<li>Khởi tạo, cố định ${mangChiSo.map((chiSo) => `A${chiSo}`).join(', ')} </li>`;

    for (let chiso = 2; chiso < maTranAA[0].length; chiso += 1) {
        tinhToanMaTranCAHtml += `<li>Duyệt A${chiso}:`;
        let indexChiSoContLonNhat = tinhMaxCont(mangChiSo, chiso);
        mangChiSo = mangChiSo.slice(0, indexChiSoContLonNhat).concat([chiso]).concat(mangChiSo.slice(indexChiSoContLonNhat));
        tinhToanMaTranCAHtml += `<div> >> Thứ tự mới ${mangChiSo.map((chiSo) => `A${chiSo}`).join(', ')}</div>`;
        tinhToanMaTranCAHtml += '</li>';
    }

    tinhToanMaTranCAHtml += '</ul>';

    return mangChiSo;
}

function tinhToanMaTranCA() {
    if (maTranAA.length < 1) return;

    mangChiSoMaTranCA = [];
    tinhToanMaTranCAHtml = '';

    mangChiSoMaTranCA = tinhChiSoMaTranCA();

    maTranCA = mangChiSoMaTranCA.map((chiSoDong) =>
        mangChiSoMaTranCA.map((chiSoCot) => {
            if (maTranAA[chiSoDong] && (maTranAA[chiSoDong][chiSoCot] || maTranAA[chiSoDong][chiSoCot] === 0)) return maTranAA[chiSoDong][chiSoCot];
            else return undefined;
        })
    );

    goiSuKien(khiThayDoi_maTranCA);
}

$(document).ready(function () {
    themSuKien(khiThayDoi_maTranCA, 'thayDoi.htmlMaTranCA', function () {
        thayDoiHtmlMaTran(
            $('#phanManhDoc .maTranCA'),
            maTranCA,
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`),
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`)
        );

        $('#phanManhDoc .xuLyMaTranCA .tinhToanMaTranCA').html(tinhToanMaTranCAHtml);
    });

    themSuKien(khiThayDoi_maTranAA, 'thayDoi.htmlMaTranAA', function () {
        tinhToanMaTranCA();
        goiSuKien(khiThayDoi_maTranCA);
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
        thayDoiHtmlMaTran(
            $('#phanManhDoc .maTranCA'),
            maTranCA,
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`),
            mangChiSoMaTranCA.map((chiSo) => `A${chiSo}`)
        );
    });
});
