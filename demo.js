$(document).ready(function () {
  // alert('abc');
  var url = 'ajax/ajaxCard';
  var ajaxobj = new AjaxObject(url, 'json'); //建立ajaxobj用來連線
  ajaxobj.getall();

  // 新增表單 addform-addBtn
  // $('#addBtn').click(function (e) {
  //   var url = 'ajax/ajaxCard';
  //   var cnname = $('#addcnname').val(); // .val() 設定值
  //   var enname = $('#addenname').val();
  //   var sex = $('input:radio:checked[name="addsex"]').val();
  //   var phone = $('#addphone').val();
  //   var email = $('#addemail').val();
  //   var ajaxobj = new AjaxObject(url, 'json');

  //   // if (!cnname || !enname || !phone || !email){
  //   //     alert("請確實填寫表單")
  //   //     return false;
  //   // }

  //   // if (!cnname ||!enname || !phone || !email){
  //   //     document.getElementById("error-cnname").innerHTML="此欄位為必填"
  //   //     return false;
  //   // }

  //   ajaxobj.cnname = cnname;
  //   ajaxobj.enname = enname;
  //   ajaxobj.sex = sex;
  //   ajaxobj.phone = phone;
  //   ajaxobj.email = email;
  //   ajaxobj.add();

  //   e.preventDefault(); // avoid to execute the actual submit of the form.
  // });

  // 新增表單 addform-resetBtn
  $('#resetBtnAdd').click(function () {
    $('#addform')[0].reset();
  });

  $('#resetBtnSe').click(function () {
    $('#searchform')[0].reset();
  });

  $('#resetBtnMo').click(function () {
    $('#modifyform')[0].reset();
  });

  // 搜尋表單 searchform-searchBtn
  $('#searchBtn').click(function (e) {
    var url = 'ajax/ajaxCard';
    // var data = $("#searchform").serialize();
    var cnname = $('#secnname').val();
    var enname = $('#seenname').val();
    var phone = $('#sephone').val();
    var email = $('#seemail').val();
    var sex = $('input:radio:checked[name="sesex"]').val();
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.cnname = cnname;
    ajaxobj.enname = enname;
    ajaxobj.phone = phone;
    ajaxobj.email = email;
    ajaxobj.sex = sex;
    ajaxobj.search();

    e.preventDefault(); // avoid to execute the actual submit of the form.
  });

  // 修改改鈕
  $('#cardtable').on('click', '.modifybutton', function (e) {
    let ssn = $(this).attr('id').substring(12);
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.modify_get(ssn);
  });
  $('#cardtable').on('click', '.deletebutton', function () {
    var deleteid = $(this).attr('id').substring(12);
    var url = 'ajax/ajaxCard';
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.id = deleteid;
    ajaxobj.delete();
  });

  // 修改表單
  $('#modifyBtn').click(function (e) {
    var url = 'ajax/ajaxCard';
    var cnname = $('#mocnname').val(); // .val() 設定值
    var enname = $('#moenname').val();
    var sex = $('input:radio:checked[name="addsex"]').val();
    var phone = $('#mophone').val();
    var email = $('#moemail').val();
    var ajaxobj = new AjaxObject(url, 'json');
    ajaxobj.cnname = cnname;
    ajaxobj.enname = enname;
    ajaxobj.sex = sex;
    ajaxobj.phone = phone;
    ajaxobj.email = email;
    ajaxobj.modify();

    e.preventDefault(); // avoid to execute the actual submit of the form.
  });
  // 自適應視窗
  // $(window).resize(function () {
  //     var wWidth = $(window).width();
  //     var dWidth = wWidth * 0.4;
  //     var wHeight = $(window).height();
  //     var dHeight = wHeight * 0.4;
  //     $("#dialog-confirm").dialog("option", "width", dWidth);
  //     $("#dialog-confirm").dialog("option", "height", dHeight);
  // });

  // 表單驗證
  let validate = $('form#addform').validate({
    rules: {
      cnname: {
        required: true,
      },
      enname: {
        required: true,
      },
      phone: {
        required: true,
        minlength:10,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      cnname: {
        required: '此欄位為必填',
      },
      enname: {
        required: '此欄位為必填',
      },
      phone: {
        required: '此欄位為必填',
        minlength: '請確實輸入手機號碼',
      },
      email: {
        required: '此欄位為必填',
        email: '請確實輸入email',
      },
    },

    invalidHandler: function () {
    },
    submitHandler: function (form) {

      var url = 'ajax/ajaxCard';
      var cnname = $('#addcnname').val(); // .val() 設定值
      var enname = $('#addenname').val();
      var sex = $('input:radio:checked[name="addsex"]').val();
      var phone = $('#addphone').val();
      var email = $('#addemail').val();
      var ajaxobj = new AjaxObject(url, 'json');

      ajaxobj.cnname = cnname;
      ajaxobj.enname = enname;
      ajaxobj.sex = sex;
      ajaxobj.phone = phone;
      ajaxobj.email = email;
      ajaxobj.add();

      e.preventDefault();
      
    },
  });
});

function refreshTable(data) {
  // var HTML = '';

  $('#cardtable tbody > tr').remove();

  $.each(data, function (key, item) {
    var strsex = '';
    if (item.sex == 0) strsex = '男';
    else strsex = '女';
    let phoneFormat =
      item.phone.slice(0, 3) +
      '-' +
      item.phone.slice(4, 7) +
      '-' +
      item.phone.slice(7);
    // console.log(phoneFormat);
    var row = $('<tr></tr>');
    row.append(
      $(
        "<td data-toggle='tooltip' data-placement='top' title='[ " +
          strsex +
          ' ] ' +
          item.cnname +
          ' ( ' +
          item.enname +
          " )'></td>"
      ).html(item.cnname)
    );
    row.append($('<td></td>').html(item.enname));
    row.append(
      $(
        "<td data-toggle='popover' data-placement='top' data-content='聯絡資訊：" +
          phoneFormat +
          "'></td>"
      ).html(item.phone)
    );
    row.append($('<td></td>').html(item.email));
    row.append($('<td></td>').html(strsex));
    row.append(
      $('<td></td>').html(
        '<button id="modifybutton' +
          item.s_sn +
          '" type="button" class="btn modifybutton btnRound" id="btnRound" data-toggle="modal" data-target="#modifybutton" data-index=' +
          key +
          '><i class="fas fa-pen"></i> <span class="glyphicon glyphicon-list-alt"></span></button>'
      )
    );
    row.append(
      $('<td></td>').html(
        '<button id="deletebutton' +
          item.s_sn +
          '" class="deletebutton btnRound deleteBtn" ><i class="fas fa-times"></i> <span class="glyphicon glyphicon-trash"></span></button>'
      )
    );
    $('#cardtable').append(row);
  });
}

function initEdit(response) {
  $('#mocnname').val(response.cnname);
  $('#moenname').val(response.enname);
  $('#mophone').val(response.phone);
  $('#moemail').val(response.email);
  if (response.sex == 0) {
    $('#modifyman').prop('checked', true);
    $('#modifywoman').prop('checked', false);
  } else {
    $('#modifyman').prop('checked', false);
    $('#modifywoman').prop('checked', true);
  }
}

// 設定預設data
let data = [
  {
    s_sn: '35',
    cnname: '邱小甘',
    enname: 'Peter',
    sex: '0',
    phone: '0985312647',
    email: 'apple123@gmail.com',
  },
  {
    s_sn: '49',
    cnname: '蔡凡昕',
    enname: 'Allen',
    sex: '0',
    phone: '0951336412',
    email: 'jeans456@gmail.com',
  },
  {
    s_sn: '50',
    cnname: '趙雪瑜',
    enname: 'Sharon',
    sex: '0',
    phone: '0942364584',
    email: 'cherry789@gmail.com',
  },
  {
    s_sn: '51',
    cnname: '賴佳蓉',
    enname: 'Yoki',
    sex: '1',
    phone: '0975212456',
    email: 'blossom555@gmail.com',
  },
];

let s_sn = 52;

/**
 *
 * @param string
 *          url 呼叫controller的url
 * @param string
 *          datatype 資料傳回格式
 * @uses refreshTable 利用ajax傳回資料更新Table
 */
function AjaxObject(url, datatype) {
  this.url = url;
  this.datatype = datatype;
}
AjaxObject.prototype.cnname = '';
AjaxObject.prototype.enname = '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
  alert('Alert:');
};

AjaxObject.prototype.getall = function () {
  response = JSON.stringify(data);
  refreshTable(JSON.parse(response));
};

AjaxObject.prototype.add = function () {
  data.push({
    s_sn: s_sn,
    cnname: this.cnname,
    enname: this.enname,
    sex: this.sex,
    phone: this.phone,
    email: this.email,
  });
  s_sn++;
  response = JSON.stringify(data);
  //   console.log(data);
  refreshTable(JSON.parse(response));

  // 新增成功sweet alert
  Swal.fire({
    title: '新增成功!',
    text: '已增加一筆資料',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
  });
  // $("#dialog-addconfirm").dialog("close");
};

let arrayIndex = '';

AjaxObject.prototype.modify = function () {
  data[arrayIndex] = {
    s_sn: String(s_sn),
    cnname: this.cnname,
    enname: this.enname,
    sex: this.sex,
    phone: this.phone,
    email: this.email,
  };
  response = JSON.stringify(data);
  refreshTable(JSON.parse(response));
  // $("#dialog-modifyconfirm").dialog("close");

  // 新增成功sweet alert
  Swal.fire({
    title: '修改成功!',
    text: '已修改一筆資料',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
  });
};

AjaxObject.prototype.modify_get = function (ssn) {
  console.log(data);
  let dataIndex = {}; //目標物件容器
  for (let i = 0; i < data.length; i++) {
    if (data[i].s_sn === ssn) {
      dataIndex = data[i];
      arrayIndex = i;
      break;
    }
  }

  response = JSON.stringify(dataIndex);
  initEdit(JSON.parse(response), data, ssn);
};

// 搜尋指定項目
AjaxObject.prototype.search = function () {
  console.log(this);
  targetId = this.id;
  targetCnname = this.cnname;
  targetEnname = this.enname;
  targetPhone = this.phone;
  targetEmail = this.email;
  targetSex = this.sex;
  data = data.filter(function (i) {
    return (
      i.cnname === targetCnname ||
      i.enname === targetEnname ||
      i.phone === targetPhone ||
      i.email === targetEmail ||
      i.sex === targetSex
    );
  });
  response = JSON.stringify(data);
  refreshTable(JSON.parse(response));
  // $("#dialog-searchconfirm").dialog("close");
};

// 刪除指定欄位
AjaxObject.prototype.delete = function () {
  targetId = this.id;
  data = data.filter(function (i) {
    return i.s_sn != targetId;
  });
  response = JSON.stringify(data);
  refreshTable(JSON.parse(response));

  // 新增成功sweet alert
  Swal.fire({
    title: '刪除成功!',
    text: '已刪除一筆資料',
    icon: 'success',
    showConfirmButton: false,
    timer: 1500,
  });
};
