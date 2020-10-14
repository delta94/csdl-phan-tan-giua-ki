class BangNhapDonGian {
    constructor() {
        this.tenCot = ['', ''];
        this.cacDong = [
            ['', ''],
            ['', ''],
        ];

        this.khiThemMotCot = [];
        this.khiThemMotDong = [];

        this.khiSuaMotCot = [];
        this.khiSuaMotDong = [];
        this.khiSuaDuLieu = [];

        this.khiXoaMotCot = [];
        this.khiXoaMotDong = [];

        this.khiCaiLaiDong = [];
        this.khiCaiLaiCot = [];
        this.khiCaiLaiDuLieu = [];

        this.khiThemSuKienTextbox = [];
        this.khiXoaSuKienTextbox = [];
        this.khiLamMoiSuKienTextbox = [];

        this.khiThayDoiBang = [];

        this.thamChieuHTML = [];

        this.khiThayDoiBang.push({ tenNhanDang: 'lamMoiBangThamChieu', hamThucThi: this.lamMoiBangThamChieu });
    }

    //Thao tác với danh sách sự kiện
    goiSuKien(mangSuKien, ...cacThamSo) {
        const that = this;
        if (Array.isArray(mangSuKien))
            mangSuKien.forEach((suKien) => {
                suKien.hamThucThi.bind(that).apply(cacThamSo);
            });
    }

    themSuKien(mangSuKien, tenNhanDang, hamThucThi) {
        mangSuKien.push({ tenNhanDang: tenNhanDang, hamThucThi: hamThucThi });
    }

    xoaSuKien(mangSuKien, tenNhanDang) {
        mangSuKien = this.mangSuKien.filter((suKien) => suKien.tenNhanDang != tenNhanDang);
    }

    //Các thao tác với dữ liệu
    themCot(tenCot, viTri) {
        if (!viTri) viTri = this.tenCot.length - 1;
        if (viTri < 0) viTri = 0;
        if (viTri > this.tenCot.length) viTri = this.tenCot.length;

        if (!tenCot) tenCot = '';

        this.tenCot = this.tenCot.slice(0, viTri).concat([tenCot]).concat(this.tenCot.slice(viTri));
        this.cacDong = this.cacDong.map((dong) => dong.slice(0, viTri).concat(['']).concat(dong.slice(viTri)));

        this.goiSuKien(this.khiThemMotCot, tenCot, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }
    suaCot(tenCotMoi, viTri) {
        this.kiemTraViTriCot(viTri);

        this.tenCot[viTri] = tenCotMoi;

        this.goiSuKien(this.khiSuaMotCot, tenCotMoi, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }
    xoaCot(viTri) {
        if (!viTri) viTri = this.tenCot.length - 1;
        this.kiemTraViTriCot(viTri);

        this.tenCot = this.tenCot.slice(0, viTri).concat(this.tenCot.slice(viTri + 1));
        this.cacDong = this.cacDong.map((dong) => dong.slice(0, viTri).concat(dong.slice(viTri + 1)));

        this.goiSuKien(this.khiXoaMotCot, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }
    caiLaiTenCot(viTri) {
        this.kiemTraViTriCot(viTri);

        this.tenCot[viTri] = '';

        this.goiSuKien(this.khiCaiLaiCot, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }

    themDong(dong, viTri) {
        if (!viTri) viTri = this.cacDong.length - 1;
        if (viTri < 0) viTri = 0;
        if (viTri > this.cacDong.length) viTri = this.cacDong.length;

        if (!dong) dong = this.taoMotDongMoi();

        this.cacDong = this.cacDong.slice(0, viTri).concat([dong]).concat(this.cacDong.slice(viTri));

        this.goiSuKien(this.khiThemMotDong, dong, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }
    suaDong(dongMoi, viTri) {
        this.kiemTraViTriDong(viTri);

        this.cacDong[viTri] = dongMoi;

        this.goiSuKien(this.khiSuaMotDong, dongMoi, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }
    xoaDong(viTri) {
        if (!viTri) viTri = this.cacDong.length - 1;
        this.kiemTraViTriDong(viTri);

        this.cacDong = this.cacDong.slice(0, viTri).concat(this.cacDong.slice(viTri + 1));

        this.goiSuKien(this.khiXoaMotDong, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }
    caiLaiDong(viTri) {
        this.kiemTraViTriDong(viTri);

        this.cacDong[viTri] = this.taoMotDongMoi();

        this.goiSuKien(this.khiCaiLaiDong, viTri);
        this.goiSuKien(this.khiThayDoiBang);
    }

    suaDuLieu(duLieu, viTriDong, viTriCot) {
        this.kiemTraViTriDuLieu(viTriDong, viTriCot);

        this.cacDong[viTriDong][viTriCot] = duLieu;

        this.goiSuKien(this.khiSuaDuLieu, viTriDong, viTriCot);
        this.goiSuKien(this.khiThayDoiBang);
    }
    caiLaiDuLieu(viTriDong, viTriCot) {
        this.kiemTraViTriDuLieu(viTriDong, viTriCot);

        this.cacDong[viTriDong][viTriCot] = '';

        this.goiSuKien(this.khiCaiLaiDuLieu, viTriDong, viTriCot);
        this.goiSuKien(this.khiThayDoiBang);
    }

    caiLaiTatCaDong() {
        this.cacDong = this.cacDong.map((dong) => this.taoMotDongMoi());
        this.goiSuKien(this.khiThayDoiBang);
    }

    caiLaiTatCaTenCot() {
        this.tenCot = this.taoMotDongMoi();
        this.goiSuKien(this.khiThayDoiBang);
    }

    caiLaiBang() {
        this.caiLaiTatCaTenCot();
        this.caiLaiTatCaDong();
        this.goiSuKien(this.khiThayDoiBang);
    }

    khoiPhucMacDinhBang() {
        this.tenCot = ['', ''];
        this.cacDong = [
            ['', ''],
            ['', ''],
        ];
        this.goiSuKien(this.khiThayDoiBang);
    }

    //Các thao tác với tham chiếu
    khoiTaoThamChieuHtml() {
        this.kiemTraThamChieuHtml();

        this.thamChieuHTML.html('');
    }

    lamMoiBangThamChieu() {
        this.kiemTraThamChieuHtml();

        let noiDungThamChieu = '';

        noiDungThamChieu += `<thead><tr>${this.tenCot.map((cot, cotIndex) => `<th><input type='text' value='${cot}' cotIndex=${cotIndex} /></th>`).join('')}</tr></thead>`;

        noiDungThamChieu += `<tbody>${this.cacDong.map((dong, dongIndex) => `<tr>${dong.map((duLieu, cotIndex) => `<td><input type='text' value='${duLieu}' dongIndex=${dongIndex} cotIndex=${cotIndex} /></td>`).join('')}</tr>`).join('')}</tbody>`;

        this.thamChieuHTML.html(noiDungThamChieu);

        this.lamMoiSuKienTextbox();
        this.goiSuKien(this.khiLamMoiSuKienTextbox);
    }

    //Kiểm tra dữ liệu có hợp lệ không
    kiemTraThamChieuHtml() {
        if (!this.thamChieuHTML) {
            throw new Exception('Không có tham chiếu html');
        } else if (!(this.thamChieuHTML instanceof jQuery)) {
            throw new Exception('Tham chiếu html phải là jQuery');
        }
    }

    kiemTraViTriCot(viTri) {
        if (viTri < 0) {
            throw new Exception('Vị trí cột phải không âm');
        }
        if (viTri >= this.tenCot.length) {
            throw new Exception('Vị trí cột ngoài phạm vi');
        }
    }

    kiemTraViTriDong(viTri) {
        if (viTri < 0) {
            throw new Exception('Vị trí dòng phải không âm');
        }
        if (viTri >= this.cacDong.length) {
            throw new Exception('Vị trí dòng ngoài phạm vi');
        }
    }

    kiemTraViTriDuLieu(viTriDong, viTriCot) {
        this.kiemTraViTriDong(viTriDong);
        this.kiemTraViTriCot(viTriCot);
    }

    //Tạo một dòng mới
    taoMotDongMoi() {
        return new Array(this.tenCot.length).fill('');
    }

    //Thao tác với sự kiện trong tham chiếu
    xoaSuKienTextbox() {
        this.kiemTraThamChieuHtml();

        $(this.thamChieuHTML).find('input').unbind('change');
    }

    themSuKienTextbox() {
        this.kiemTraThamChieuHtml();

        const that = this;

        $(this.thamChieuHTML)
            .find('input')
            .change(function () {
                let duLieuMoi = $(this).val();
                let viTriDong = $(this).attr('dongIndex');
                let viTriCot = $(this).attr('cotIndex');

                viTriDong = parseInt(viTriDong);
                viTriCot = parseInt(viTriCot);

                if (isNaN(viTriDong)) {
                    that.suaCot(duLieuMoi, viTriCot);
                } else {
                    that.suaDuLieu(duLieuMoi, viTriDong, viTriCot);
                }
            });
    }

    lamMoiSuKienTextbox() {
        this.xoaSuKienTextbox();
        this.goiSuKien(this.khiXoaSuKienTextbox);

        this.themSuKienTextbox();
        this.goiSuKien(this.khiThemSuKienTextbox);
    }
}
