$(document).ready(function () {
    


    // alert('abc');
    var url = "ajax/ajaxCard";
    var ajaxobj = new AjaxObject(url, 'json'); //建立ajaxobj用來連線
    ajaxobj.getall();

    // 新增表單 addform-addBtn
    $("#addBtn").click(
        function (e) {
            var url = "ajax/ajaxCard";
            var cnname = $("#addcnname").val(); // .val() 設定值
            var enname = $("#addenname").val();
            var sex = $('input:radio:checked[name="addsex"]').val();
            var phone = $("#addphone").val();
            var email = $("#addemail").val();
            var ajaxobj = new AjaxObject(url, 'json');
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.sex = sex;
            ajaxobj.phone = phone;
            ajaxobj.email = email;
            ajaxobj.add();

            e.preventDefault(); // avoid to execute the actual submit of the form.
        },
    )

    // 新增表單 addform-resetBtn searchform-resetBtn
    $("#resetBtn").click(
        function () {
        $("#addform")[0].reset();
        $("#searchform")[0].reset();
        }
    )

    // 搜尋表單 searchform-searchBtn
    $("#searchBtn").click(
        function (e) {
            var url = "ajax/ajaxCard";
            // var data = $("#searchform").serialize();
            var cnname = $("#secnname").val();
            var enname = $("#seenname").val();
            var sex = $('input:radio:checked[name="sesex"]').val();
            var ajaxobj = new AjaxObject(url, 'json');
            ajaxobj.cnname = cnname;
            ajaxobj.enname = enname;
            ajaxobj.sex = sex;
            ajaxobj.search();

            e.preventDefault(); // avoid to execute the actual submit of the form.
        }
    )


    // 修改鈕
    $("#cardtable").on('click', '.modifybutton', function () {
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.modify_get();
    })
    $("#cardtable").on('click', '.deletebutton', function () {
        var deleteid = $(this).attr('id').substring(12);
        var url = "ajax/ajaxCard";
        var ajaxobj = new AjaxObject(url, 'json');
        ajaxobj.id = deleteid;
        ajaxobj.delete();
    })

    // 自適應視窗
    // $(window).resize(function () {
    //     var wWidth = $(window).width();
    //     var dWidth = wWidth * 0.4;
    //     var wHeight = $(window).height();
    //     var dHeight = wHeight * 0.4;
    //     $("#dialog-confirm").dialog("option", "width", dWidth);
    //     $("#dialog-confirm").dialog("option", "height", dHeight);
    // });
});
function refreshTable(data) {
    // var HTML = '';
    $("#cardtable tbody > tr").remove();
    $.each(data, function (key, item) {
        var strsex = '';
        if (item.sex == 0)
            strsex = '男';
        else
            strsex = '女';
        var row = $("<tr></tr>");
        row.append($("<td></td>").html(item.cnname));
        row.append($("<td></td>").html(item.enname));
        row.append($("<td></td>").html(item.phone));
        row.append($("<td></td>").html(item.email));
        row.append($("<td></td>").html(strsex));
        row.append($("<td></td>").html('<button id="modifybutton' + item.s_sn + '" class="modifybutton btnRound" " data-index=' + key + '><i class="fas fa-pen"></i> <span class="glyphicon glyphicon-list-alt"></span></button>'));
        row.append($("<td></td>").html('<button id="deletebutton' + item.s_sn + '" class="deletebutton btnRound" "><i class="fas fa-times"></i> <span class="glyphicon glyphicon-trash"></span></button>'));
        $("#cardtable").append(row);
    });
}

function initEdit(response) {
  var modifyid = $("#cardtable").attr('id').substring(12);
  $("#mocnname").val(response[0].cnname);
  $("#moenname").val(response[0].enname);
  if (response[0].sex == 0) {
      $("#modifyman").prop("checked", true);
      $("#modifywoman").prop("checked", false);
  }
  else {
      $("#modifyman").prop("checked", false);
      $("#modifywoman").prop("checked", true);
  }
  $("#modifysid").val(modifyid);
  $("#dialog-modifyconfirm").dialog({
      resizable: true,
      height: $(window).height() * 0.4,// dialog視窗度
      width: $(window).width() * 0.4,
      modal: true,
      buttons: {
          // 自訂button名稱
          "修改": function (e) {
              // $("#modifyform").submit();
              var url = "ajax/ajaxCard";
              var cnname = $("#mocnname").val();
              var enname = $("#moenname").val();
              var sex = $('input:radio:checked[name="mosex"]').val();
              var ajaxobj = new AjaxObject(url, 'json');
              ajaxobj.cnname = cnname;
              ajaxobj.enname = enname;
              ajaxobj.sex = sex;
              ajaxobj.id = modifyid;
              ajaxobj.modify();

              e.preventDefault(); // avoid to execute the actual submit of the form.
          },
          "重新填寫": function () {
              $("#modifyform")[0].reset();
          },
          "取消": function () {
              $(this).dialog("close");
          }
      },
      error: function (exception) { alert('Exeption:' + exception); }
  });
}

// 設定預設data
let data = [
    {"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0","phone":"0985312647","email":"apple123@gmail.com"},
    {"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0","phone":"0951336412","email":"jeans456@gmail.com"},
    {"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0","phone":"0942364584","email":"cherry789@gmail.com"},
    {"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1","phone":"0975212456","email":"blossom555@gmail.com"}];

let s_sn =52;

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
AjaxObject.prototype.enname= '';
AjaxObject.prototype.sex = '';
AjaxObject.prototype.id = 0;
AjaxObject.prototype.alertt = function () {
    alert("Alert:");
}

AjaxObject.prototype.getall = function () {
  response = JSON.stringify(data);
  refreshTable(JSON.parse(response));
}

AjaxObject.prototype.add = function () {
  data.push({"s_sn":s_sn,"cnname":this.cnname,"enname":this.enname,"sex":this.sex, "phone": this.phone, "email": this.email});
  s_sn++
  response =JSON.stringify(data);
//   console.log(data);
  refreshTable(JSON.parse(response));
  $("#dialog-addconfirm").dialog("close");
}

AjaxObject.prototype.modify = function () {
  response = '[{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"}]';
  refreshTable(JSON.parse(response));
  $("#dialog-modifyconfirm").dialog("close");
}

AjaxObject.prototype.modify_get = function () {
  response = '[{"s_sn":"35","cnname":"邱小甘","enname":"Peter","sex":"0"},{"s_sn":"49","cnname":"蔡凡昕","enname":"Allen","sex":"0"},{"s_sn":"50","cnname":"趙雪瑜","enname":"Sharon","sex":"0"},{"s_sn":"51","cnname":"賴佳蓉","enname":"Yoki","sex":"1"}]';
  initEdit(JSON.parse(response));
}

// 搜尋指定樣木
AjaxObject.prototype.search = function () {
  targetId = this.id
  targetCnname = this.cnname
  targetEnname = this.enname
  targetPhone = this.phone
  targetEmail = this.email
  targetSex = this.sex
  data = data.filter(function(i){
    return i.cnname === targetCnname || i.enname === targetEnname || i.phone === targetPhone || i.email === targetEmail || i.sex === targetSex
  })
  response = JSON.stringify(data);
  refreshTable(JSON.parse(response));
  $("#dialog-searchconfirm").dialog("close");
}

// 刪除指定欄位
AjaxObject.prototype.delete = function () {
    targetId = this.id
    data = data.filter(function(i){
        return i.s_sn != targetId
    })
  response = JSON.stringify(data);
  refreshTable(JSON.parse(response));
}

