var NhanVien = function(maNV, tenNV, heSoCV, cVu, luongCB, soGL) {
    this.maNhanVien = maNV;
    this.tenNhanVien = tenNV;
    this.heSoChucVu = heSoCV;
    this.chucVu = cVu;
    this.luongCoBan = luongCB;
    this.soGioLamTrongThang = soGL;
    this.luongNhanVien = function() {
        var tongLuong = Number(this.luongCoBan) * Number(this.heSoChucVu);
        return tongLuong;
    }
    this.xepLoaiNhanVien = function() {
        var xepLoai = '';
        var tongSoGioLam = this.soGioLam;
        if(tongSoGioLam > 120) {
            xepLoai = 'Nhân viên xuất sắc';
        } else if(tongSoGioLam > 100 && tongSoGioLam <= 120) {
            xepLoai = 'Nhân viên giỏi';
        } else if(tongSoGioLam > 80 && tongSoGioLam <= 100) {
            xepLoai = 'Nhân viên khá';
        } else if(tongSoGioLam > 60 && tongSoGioLam <= 80) {
            xepLoai = 'Nhân viên trung bình';
        } else {
            xepLoai = 'Nhân viên kém';
        }
        return xepLoai;
    }
}