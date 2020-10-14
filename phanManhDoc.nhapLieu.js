$(document).ready(function () {
    $('#phanManhDoc input.soPhanTuQ').change(function () {
        soPhanTuQ = parseInt($(this).val());
        goiSuKien(khiThayDoi_soPhanTuQ, null);
    });

    $('#phanManhDoc input.soPhanTuA').change(function () {
        soPhanTuA = parseInt($(this).val());
        goiSuKien(khiThayDoi_soPhanTuA, null);
    });

    $('#phanManhDoc input.soPhanTuS').change(function () {
        soPhanTuS = parseInt($(this).val());
        goiSuKien(khiThayDoi_soPhanTuS, null);
    });

    themSuKien(khiThayDoi_soPhanTuQ, 'input.soPhanTuQ', function () {
        $('#phanManhDoc input.soPhanTuQ').val(soPhanTuQ);
    });
    themSuKien(khiThayDoi_soPhanTuA, 'input.soPhanTuA', function () {
        $('#phanManhDoc input.soPhanTuA').val(soPhanTuA);
    });
    themSuKien(khiThayDoi_soPhanTuS, 'input.soPhanTuS', function () {
        $('#phanManhDoc input.soPhanTuS').val(soPhanTuS);
    });

    themSuKien(khiThayDoi_soPhanTuQ, 'hienThiTapQ', function () {
        $('#phanManhDoc span.hienThiTapQ').text(
            new Array(soPhanTuQ)
                .fill('q')
                .map((item, index) => `${item}${index}`)
                .join(', ')
        );
    });
    themSuKien(khiThayDoi_soPhanTuA, 'hienThiTapA', function () {
        $('#phanManhDoc span.hienThiTapA').text(
            new Array(soPhanTuA)
                .fill('A')
                .map((item, index) => `${item}${index}`)
                .join(', ')
        );
    });
    themSuKien(khiThayDoi_soPhanTuS, 'hienThiTapS', function () {
        $('#phanManhDoc span.hienThiTapS').text(
            new Array(soPhanTuS)
                .fill('S')
                .map((item, index) => `${item}${index}`)
                .join(', ')
        );
    });

    themSuKien(khiThayDoi_soPhanTuQ, 'thayDoi.maTranUSE', function () {
        thayDoiCacDongMaTran(maTranUSE, soPhanTuQ, soPhanTuA, khiThayDoi_maTranUSE);
    });
    themSuKien(khiThayDoi_soPhanTuQ, 'thayDoi.maTranACC', function () {
        thayDoiCacDongMaTran(maTranACC, soPhanTuQ, soPhanTuS, khiThayDoi_maTranACC);
    });
    themSuKien(khiThayDoi_soPhanTuQ, 'thayDoi.maTranREF', function () {
        thayDoiCacDongMaTran(maTranREF, soPhanTuQ, soPhanTuS, khiThayDoi_maTranREF);
    });

    themSuKien(khiThayDoi_soPhanTuA, 'thayDoi.maTranUSE', function () {
        thayDoiCacCotMaTran(maTranUSE, soPhanTuA, khiThayDoi_maTranUSE);
    });

    themSuKien(khiThayDoi_soPhanTuS, 'thayDoi.maTranACC', function () {
        thayDoiCacCotMaTran(maTranACC, soPhanTuS, khiThayDoi_maTranACC);
    });

    themSuKien(khiThayDoi_soPhanTuS, 'thayDoi.maTranREF', function () {
        thayDoiCacCotMaTran(maTranREF, soPhanTuS, khiThayDoi_maTranREF);
    });

    themSuKien(khiThayDoi_maTranUSE, 'thayDoi.maTranUSE.html', function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranUSE'), maTranUSE, 'q', 'A');

        // xoaSuKienThayDoiTextbox($('#phanManhDoc .maTranUSE'));
        // themSuKienThayDoiTextbox($('#phanManhDoc .maTranUSE'), maTranUSE);
    });

    themSuKien(khiThayDoi_maTranACC, 'thayDoi.maTranACC.html', function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranACC'), maTranACC, 'q', 'S');

        // xoaSuKienThayDoiTextbox($('#phanManhDoc .maTranACC'));
        // themSuKienThayDoiTextbox($('#phanManhDoc .maTranACC'), maTranACC);
    });

    themSuKien(khiThayDoi_maTranREF, 'thayDoi.maTranREF.html', function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranREF'), maTranREF, 'q', 'S');

        // xoaSuKienThayDoiTextbox($('#phanManhDoc .maTranREF'));
        // themSuKienThayDoiTextbox($('#phanManhDoc .maTranREF'), maTranREF);
    });

    $('#phanManhDoc .nhapNgauNhienMaTranUSE').click(function () {
        nhapNgauNhienMaTran(maTranUSE, 0, 1, khiThayDoi_maTranUSE);
    });
    $('#phanManhDoc .nhapNgauNhienMaTranACC').click(function () {
        nhapNgauNhienMaTran(maTranACC, 0, 10, khiThayDoi_maTranACC);
    });
    $('#phanManhDoc .nhapNgauNhienMaTranREF').click(function () {
        nhapNgauNhienMaTran(maTranREF, 0, 2, khiThayDoi_maTranREF);
    });

    $('#phanManhDoc .caiLaiMaTranUSE').click(function () {
        caiLaiMaTran(maTranUSE, 0, khiThayDoi_maTranUSE);
    });
    $('#phanManhDoc .caiLaiMaTranACC').click(function () {
        caiLaiMaTran(maTranACC, 0, khiThayDoi_maTranACC);
    });
    $('#phanManhDoc .caiLaiMaTranREF').click(function () {
        caiLaiMaTran(maTranREF, 0, khiThayDoi_maTranREF);
    });

    $('#phanManhDoc .nhapNgauNhienNhapLieu').click(function () {
        nhapNgauNhienMaTran(maTranUSE, 0, 1, khiThayDoi_maTranUSE);
        nhapNgauNhienMaTran(maTranACC, 0, 10, khiThayDoi_maTranACC);
        nhapNgauNhienMaTran(maTranREF, 0, 2, khiThayDoi_maTranREF);
    });
    $('#phanManhDoc .caiLaiNhapLieu').click(function () {
        caiLaiMaTran(maTranUSE, 0, khiThayDoi_maTranUSE);
        caiLaiMaTran(maTranACC, 0, khiThayDoi_maTranACC);
        caiLaiMaTran(maTranREF, 0, khiThayDoi_maTranREF);
    });

    $('#phanManhDoc .ghiMaTranUSE').click(function () {
        if (maTranUSE.length < 1) return;
        maTranUSE = layThongTinTrenMaTran($('#phanManhDoc .maTranUSE'), maTranUSE.length, maTranUSE[0].length);
        goiSuKien(khiThayDoi_maTranUSE);
    });
    $('#phanManhDoc .ghiMaTranACC').click(function () {
        if (maTranACC.length < 1) return;
        maTranACC = layThongTinTrenMaTran($('#phanManhDoc .maTranACC'), maTranACC.length, maTranACC[0].length);
        goiSuKien(khiThayDoi_maTranACC);
    });
    $('#phanManhDoc .ghiMaTranREF').click(function () {
        if (maTranREF.length < 1) return;
        maTranREF = layThongTinTrenMaTran($('#phanManhDoc .maTranREF'), maTranREF.length, maTranREF[0].length);
        goiSuKien(khiThayDoi_maTranREF);
    });

    $('#phanManhDoc .lamMoiMaTranUSE').click(function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranUSE'), maTranUSE, 'q', 'A');
    });
    $('#phanManhDoc .lamMoiMaTranACC').click(function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranACC'), maTranACC, 'q', 'S');
    });
    $('#phanManhDoc .lamMoiMaTranREF').click(function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranREF'), maTranREF, 'q', 'S');
    });

    //Nhap JSON
    $('#phanManhDoc .nhapJsonNhapLieuThucThi').click(function () {
        let jsonString = $('#phanManhDoc .nhapJsonNhapLieuDiv .textareaJson').val();
        nhapMaTranTuJson(jsonString);
    });
    $('#phanManhDoc .nhapJsonNhapLieuCaiLai').click(function () {
        $('#phanManhDoc .nhapJsonNhapLieuDiv .textareaJson').val('');
    });

    //Xuat JSON
    $('#phanManhDoc .xuatJsonNhapLieuThucThi').click(function () {
        let jsonString = xuatMaTranThanhJson();
        $('#phanManhDoc .xuatJsonNhapLieuDiv .textareaJson').val(jsonString);
    });
    $('#phanManhDoc .xuatJsonNhapLieuCaiLai').click(function () {
        $('#phanManhDoc .xuatJsonNhapLieuDiv .textareaJson').val('');
    });

    //Nhap Local Storage
    $('#phanManhDoc .nhapLocalStorageNhapLieuXemDuLieu').click(function () {
        let mangTen = JSON.parse(localStorage.getItem('MANG_TEN_CAC_TAP_DU_LIEU'));
        if (mangTen && mangTen.length > 0) {
            let luaChonTapDuLieuHtml = ``;
            mangTen.forEach((ten) => {
                let duLieu = localStorage.getItem(ten);
                luaChonTapDuLieuHtml += `<div><input name="luaChonTapDuLieuRadio" type="radio" value="${ten}"/><label class="ml-3 mb-0 mt-0">${ten}</label><div>${duLieu}</div></div>`;
            });
            $('#phanManhDoc .nhapLocalStorageNhapLieuDiv .luaChonTapDuLieu').html(luaChonTapDuLieuHtml);
        }
    });

    $('#phanManhDoc .nhapLocalStorageNhapLieuThucThi').click(function () {
        let tenTapDuLieu = $(`#phanManhDoc input[name="luaChonTapDuLieuRadio"]:checked`).val();

        let jsonString = localStorage.getItem(tenTapDuLieu);
        nhapMaTranTuJson(jsonString);
    });

    //Xuat Local Storage
    $('#phanManhDoc .xuatLocalStorageNhapLieuThucThi').click(function () {
        let tenTapDuLieu = $('#phanManhDoc .xuatLocalStorageNhapLieuDiv .tenTapDuLieu').val();
        if (tenTapDuLieu && tenTapDuLieu !== '') {
            let jsonString = xuatMaTranThanhJson();
            localStorage.setItem(tenTapDuLieu, jsonString);

            let mangTen = JSON.parse(localStorage.getItem('MANG_TEN_CAC_TAP_DU_LIEU'));
            if (!mangTen) mangTen = [];

            mangTen.push(tenTapDuLieu);
            localStorage.setItem('MANG_TEN_CAC_TAP_DU_LIEU', JSON.stringify(mangTen));
        }
        $('#phanManhDoc .xuatLocalStorageNhapLieuDiv .tenTapDuLieu').val('');
    });
});
