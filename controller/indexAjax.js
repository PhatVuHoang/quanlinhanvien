var validation = new Validation();
var kiemTra = function () {
  var valid = true;
  valid &=
    validation.kiemTraRong(
      "#txtTenNhanVien",
      "tên nhân viên",
      "#kiemTraRong_tenNhanVien"
    ) &
    validation.kiemTraRong(
      "#txtLuongCoBan",
      "lương căn bản",
      "#kiemTraRong_luongCanBan"
    ) &
    validation.kiemTraRong(
      "#txtSoGioLam",
      "số giờ làm",
      "#kiemTraRong_soGioLam"
    );
  valid = validation.kiemTraDoDai(
    "#txtMaNhanVien",
    "mã nhân viên",
    "#kiemTraDoDai_maNhanVien",
    4,
    6
  );
  valid = validation.kiemTraTatCaChu(
    "#txtTenNhanVien",
    "tên nhân viên",
    "#kiemTraTatCaChu_tenNhanVien"
  );
  valid &=
    validation.kiemTraGiaTri(
      "#txtLuongCoBan",
      "lương căn bản",
      "#kiemTraGiaTri_luongCanBan",
      1000000,
      20000000
    ) &
    validation.kiemTraGiaTri(
      "#txtSoGioLam",
      "số giờ làm",
      "#kiemTraGiaTri_soGioLam",
      50,
      150
    );

  if (!valid) {
    return;
  }
};

var renderNhanVien = function () {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
    method: "GET",
    responseType: "json",
  });
  promise.then(function (result) {
    console.log("result", result.data);
    renderTableNhanVien(result.data);
  });
  promise.catch(function (error) {
    console.log(error);
  });
};

var renderTableNhanVien = function (arrNhanVien) {
  var content = "";
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nhanVien = arrNhanVien[i];
    var nv = new NhanVien(
      nhanVien.maNhanVien,
      nhanVien.tenNhanVien,
      nhanVien.heSoChucVu,
      nhanVien.chucVu,
      nhanVien.luongCoBan,
      nhanVien.soGioLamTrongThang
    );

    content += `
        <tr>
        <td>${nv.maNhanVien}</td>
        <td>${nv.tenNhanVien}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.luongCoBan}</td>
        <td>${nv.luongNhanVien()}</td>
        <td>${nv.soGioLamTrongThang}</td>
        <td>${nv.xepLoaiNhanVien()}</td>
        <td>
        <button class="btn btn-danger" onclick="xoaNhanVien('${
          nv.maNhanVien
        }')">Xóa</button>
        <button class="btn btn-danger" onclick="chinhSua('${
          nv.maNhanVien
        }')">Chỉnh sửa</button>
        </td>
        </tr>
        `;
  }
  document.querySelector("#tblNhanVien").innerHTML = content;
};

renderNhanVien();

document.querySelector("#btnXacNhan").onclick = function () {
  var nhanVien = new NhanVien();
  nhanVien.maNhanVien = document.querySelector("#txtMaNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#txtTenNhanVien").value;
  nhanVien.heSoChucVu = document.querySelector("#chucVu").value;
  nhanVien.soGioLamTrongThang = document.querySelector("#txtSoGioLam").value;
  nhanVien.luongCoBan = document.querySelector("#txtLuongCoBan").value;

  var arrOption = document.querySelector("#chucVu").options;
  var slChucVu = document.querySelector("#chucVu");
  nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;

  kiemTra();

  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
    method: "POST",
    data: nhanVien,
    responseType: "json",
  });
  promise.then(function (result) {
    console.log(result.data);
    renderNhanVien();
  });

  promise.catch(function (error) {
    console.log(error);
  });
};

window.xoaNhanVien = function (maNhanVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
    method: "DELETE",
  });
  promise
    .then(function (result) {
      renderNhanVien();
    })
    .catch(function (error) {
      console.log(error);
    });
};

document.querySelector("#capNhatNhanVien").onclick = function () {
  var nhanVien = new NhanVien();
  var arrOption = document.querySelector("#chucVu").options;
  var slChucVu = document.querySelector("#chucVu");

  nhanVien.maNhanVien = document.querySelector("#txtMaNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#txtTenNhanVien").value;
  nhanVien.chucVu = arrOption[slChucVu.selectedIndex].innerHTML;
  nhanVien.heSoChucVu = document.querySelector("#chucVu").value;
  nhanVien.luongCoBan = document.querySelector("#txtLuongCoBan").value;
  nhanVien.luongNhanVien();
  nhanVien.soGioLamTrongThang = document.querySelector("#txtSoGioLam").value;
  nhanVien.xepLoaiNhanVien();

  kiemTra();

  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
    method: "PUT",
    data: nhanVien,
  });

  promise.then(function (result) {
    renderNhanVien();
  });
  // Xử lý thất bại
  promise.catch(function (error) {
    console.log(error.reponse.data);
  });
};

window.chinhSuaNhanVien = function (maNhanVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
    method: "GET",
  });

  promise.then(function (result) {
    console.log("Xử lý thành công", result.data);

    var arrOption = document.querySelector("#chucVu").options;
    var slChucVu = document.querySelector("#chucVu");
    var nv = result.data;

    document.querySelector("#txtMaNhanVien").value = nv.maNhanVien;
    document.querySelector("#txtTenNhanVien").value = nv.tenNhanVien;
    arrOption[slChucVu.selectedIndex].innerHTML = nv.chucVu;
    document.querySelector("#txtLuongCoBan").value = nv.luongCoBan;
    document.querySelector("#txtSoGioLam").value = nv.soGioLamTrongThang;
    renderNhanVien();
  });

  promise.catch(function (error) {
    console.log(error);
  });
};
