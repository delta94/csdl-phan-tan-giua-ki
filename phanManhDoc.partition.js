function tinhToanMaTranPhanManhDoc() {
    let tapQ = new Array(soPhanTuQ).fill('q').map((item, index) => `${item}${index}`);
    let tapAQ = maTranUSE.map((dong) =>
        dong
            .map((duLieu, indexCot) => {
                return { indexCot, duLieu };
            })
            .filter((duLieu) => duLieu.duLieu == 1)
            .map((duLieu) => duLieu.indexCot)
    );

    maTranCA.forEach();
}

$(document).ready(function () {
    themSuKien(khiThayDoi_maTranPhanManhDoc, 'thayDoi.htmlMaTranPhanManhDoc', function () {
        thayDoiHtmlMaTran(
            $('#phanManhDoc .maTranPhanManhDoc'),
            maTranPhanManhDoc,
            mangChiSoMaTranPhanManhDoc.map((chiSo) => `A${chiSo}`),
            mangChiSoMaTranPhanManhDoc.map((chiSo) => `A${chiSo}`)
        );

        $('#phanManhDoc .xuLyMaTranPhanManhDoc .tinhToanMaTranPhanManhDoc').html(tinhToanMaTranPhanManhDocHtml);
    });

    themSuKien(khiThayDoi_maTranCA, 'thayDoi.htmlMaTranPhanManhDoc', function () {
        tinhToanMaTranPhanManhDoc();
        goiSuKien(khiThayDoi_MaTranPhanManhDoc);
    });

    $('#phanManhDoc .tinhLaiMaTranPhanManhDoc').click(function () {
        tinhToanMaTranPhanManhDoc();
        goiSuKien(khiThayDoi_MaTranPhanManhDoc);
    });
    $('#phanManhDoc .lamMoiMaTranPhanManhDoc').click(function () {
        thayDoiHtmlMaTran(
            $('#phanManhDoc .maTranPhanManhDoc'),
            maTranPhanManhDoc,
            mangChiSoMaTranPhanManhDoc.map((chiSo) => `A${chiSo}`),
            mangChiSoMaTranPhanManhDoc.map((chiSo) => `A${chiSo}`)
        );
    });
});
