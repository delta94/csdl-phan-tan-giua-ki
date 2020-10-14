function tinhToanMaTranAA() {
    maTranAA = new Array(soPhanTuA).fill('');
    maTranAA.forEach((_, index) => {
        maTranAA[index] = new Array(soPhanTuA).fill(0);
    });
    $('#phanManhDoc .tinhToanMaTranAA').html('');

    for (let phanTuA1 = 0; phanTuA1 < soPhanTuA; phanTuA1 += 1) {
        for (let phanTuA2 = phanTuA1; phanTuA2 < soPhanTuA; phanTuA2 += 1) {
            let duLieuAA = 0;

            let htmlTinhToan = `<li><div>Xét hai cột A${phanTuA1} A${phanTuA2}: `;
            let htmlTinhToanChiTiet = ``;

            maTranUSE.forEach((dongUSE, indexDongUSE) => {
                if (dongUSE[phanTuA1] == 1 && dongUSE[phanTuA2] == 1) {
                    let duLieuNhan = 0;
                    maTranACC[indexDongUSE].forEach((duLieuACC, indexCotACC) => {
                        duLieuNhan += duLieuACC * maTranREF[indexDongUSE][indexCotACC];
                    });

                    duLieuAA += duLieuNhan;

                    htmlTinhToanChiTiet += `<li>Tại q${indexDongUSE}: Ta có ${maTranACC[indexDongUSE].map((duLieuACC, indexCotACC) => `${duLieuACC}x${maTranREF[indexDongUSE][indexCotACC]}`).join(' + ')} = ${duLieuNhan}</li>`;
                }
            });
            maTranAA[phanTuA1][phanTuA2] = duLieuAA;
            maTranAA[phanTuA2][phanTuA1] = duLieuAA;

            if (htmlTinhToanChiTiet == ``) htmlTinhToan += `Không tìm thấy dòng nào phù hợp`;
            else htmlTinhToan += `Giá trị tính được là ${duLieuAA}`;
            htmlTinhToan += `</div><ul>${htmlTinhToanChiTiet}</ul></li>`;
            $('#phanManhDoc .tinhToanMaTranAA').append(htmlTinhToan);
        }
    }
}

$(document).ready(function () {
    themSuKien(khiThayDoi_maTranUSE, 'thayDoi.maTranAA', function () {
        tinhToanMaTranAA();
        goiSuKien(khiThayDoi_maTranAA);
    });
    themSuKien(khiThayDoi_maTranACC, 'thayDoi.maTranAA', function () {
        tinhToanMaTranAA();
        goiSuKien(khiThayDoi_maTranAA);
    });
    themSuKien(khiThayDoi_maTranREF, 'thayDoi.maTranAA', function () {
        tinhToanMaTranAA();
        goiSuKien(khiThayDoi_maTranAA);
    });

    themSuKien(khiThayDoi_maTranAA, 'thayDoi.htmlMaTranAA', function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranAA'), maTranAA, 'A', 'A');
    });

    $('#phanManhDoc .tinhLaiMaTranAA').click(function () {
        tinhToanMaTranAA();
        goiSuKien(khiThayDoi_maTranAA);
    });

    $('#phanManhDoc .ghiMaTranAA').click(function () {
        if (maTranAA.length < 1) return;
        maTranAA = layThongTinTrenMaTran($('#phanManhDoc .maTranAA'), maTranAA.length, maTranAA[0].length);
        goiSuKien(khiThayDoi_maTranAA);
    });
    $('#phanManhDoc .lamMoiMaTranAA').click(function () {
        thayDoiHtmlMaTran($('#phanManhDoc .maTranAA'), maTranAA, 'A', 'A');
    });
});
