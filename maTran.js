class MaTran {
    constructor(selectorMaTran = $('body'), duLieu = [], tuyChon = {}) {
        this.duLieu = duLieu || [];

        this.selectorMaTran = selectorMaTran;

        this.tuyChon.coTenCotTren = false;
        this.tuyChon.coTenCotDuoi = false;
        this.tuyChon.coTenDongTrai = false;
        this.tuyChon.coTenDongPhai = false;

        this.tuyChon.mangTenCotTren = [];
        this.tuyChon.mangTenCotDuoi = [];
        this.tuyChon.mangTenDongTrai = [];
        this.tuyChon.mangTenDongPhai = [];

        this.tuyChon.hienThi.Chung = (duLieu) => `${duLieu}`;
        this.tuyChon.hienThi.dacBiet = undefined;
    }

    get soDong() {
        return this.duLieu.length;
    }

    get soCot() {
        if (this.duLieu.length < 1) return this.duLieu[0].length;
        else return 0;
    }

    chuanHoaTuyChon() {}

    renderDuLieuMacDinh(duLieu) {
        return `${duLieu}`;
    }

    html() {
        let maTranHtml = ``;

        if (!this.duLieu || this.duLieu.length < 1) maTranHtml += `<b><i>Không có dữ liệu</i></b>`;
        else {
            //
        }

        return maTranHtml;
    }

    dongBoHtml(coTenCotTren = false, coTenDongTrai = false, coTenCotDuoi = false, coTenDongPhai = false) {
        this.selectorMaTran.html(this.html(coTenCotTren, coTenDongTrai, coTenCotDuoi, coTenDongPhai));
    }

    stringify() {
        return JSON.stringify({ duLieu: this.duLieu, tuyChon: this.tuyChon });
    }

    parse(jsonString) {
        let maTranDuLieu = JSON.parse(jsonString);
        this.duLieu = maTranDuLieu.duLieu;
        this.tuyChon = this.tuyChon;
    }
}
