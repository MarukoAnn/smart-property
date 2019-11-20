import {Component, OnDestroy, OnInit} from '@angular/core';
import {LatePaymentQueryData} from '../../../common/model/latepayment.model';
import {PublicMethedService} from '../../../common/public/public-methed.service';
import {LatePaymentService} from '../../../common/services/late-payment.service';
import {BtnOption} from '../../../common/components/header-btn/headerData.model';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';

@Component({
  selector: 'rbi-latepayment-no-pass',
  templateUrl: './latepayment-no-pass.component.html',
  styleUrls: ['./latepayment-no-pass.component.less']
})
export class LatepaymentNoPassComponent implements OnInit, OnDestroy {

  public latePaymentNoContents: any;
  public optionTable: any;
  public SearchData: LatePaymentQueryData = new LatePaymentQueryData();
  // 详情相关
  public dialogOption: any;
  public detailTitle = [
    {field: 'orderId', header: '订单编号'},
    {field: 'villageName', header: '小区名称'},
    {field: 'regionName', header: '地块名称'},
    {field: 'buildingName', header: '楼宇名称'},
    {field: 'unitName', header: '单元名称'},
    {field: 'roomCode', header: '房间号'},
    {field: 'roomSize', header: '房间大小'},
    {field: 'surname', header: '客户姓'},
    {field: 'mobilePhone', header: '手机号'},
    {field: 'amountTotalReceivable', header: '应收总金额'},
    {field: 'actualTotalMoneyCollection', header: '实收总金额'},
    {field: 'surplusTotal', header: '减免金额'},
    {field: 'surplusReason', header: '减免原因'},
    {field: 'auditStatus', header: '审核状态'},
    {field: 'reviserId', header: '修订人'},
    {field: 'auditId', header: '审核人'},
    {field: 'retrialId', header: '复核人'},
    {field: 'propertyActualMoneyCollection', header: '物业费金额'},
    {field: 'month', header: '缴费月数'},
    {field: 'liquidatedDamageDueTime', header: '违约金到期时间'},
    {field: 'startTime', header: '物业费计费开始时间'},
    {field: 'dueTime', header: '物业费计费结束时间'},
    {field: 'oneMonthPropertyFeeAmount', header: '单月物业费'},
    {field: 'tollCollectorName', header: '操作人姓名'},
    {field: 'superfluousAmount', header: '超额物业费'},
    {field: 'reviserName', header: '修订人姓名'},
    {field: 'auditName', header: '审核人姓名'},
    {field: 'retrialName', header: '复审人姓名'},
    {field: 'quarterlyCycleTime', header: '季度周期循环时间'},
    {field: 'remarks', header: '备注'},

  ];
  public btnOption: BtnOption = new BtnOption();

  // 其他相关
  public pageOption: any;
  public loadHidden = true;

  public themeSub: Subscription;
  public table = {
    tableheader: {background: '', color: ''},
    tableContent: [
      {background: '', color: ''},
      {background: '', color: ''}],
    detailBtn: ''
  };
  // public msgs: Message[] = []; // 消息弹窗
  constructor(
    private toolSrv: PublicMethedService,
    private lateSrv: LatePaymentService,
    private themeSrv: ThemeService,
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.latePaymentNoContents);
      }
    );
  }
  ngOnInit() {
    if (this.themeSrv.setTheme !== undefined) {
      this.table.tableheader = this.themeSrv.setTheme.table.header;
      this.table.tableContent = this.themeSrv.setTheme.table.content;
      this.table.detailBtn = this.themeSrv.setTheme.table.detailBtn;
    }
    this.btnOption.btnlist = [];
    this.btnOption.searchHidden = true;
    this.lateNopassInitialization();
  }
  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
  }
  // Initialize lateNopass data
  public  lateNopassInitialization(): void {
    this.SearchData.pageNo = 1;
    this.SearchData.pageSize = 10;
    this.queryData(this.SearchData);
  }
  // paging query
  public  nowpageEventHandle(event: any): void {
    this.SearchData.pageNo = event;
    // this.SearchData.pageNo = 10;
    // console.log(this.SearchData);
    this.queryData(this.SearchData);
  }
  // set table data
  public  setTableOption(data1): void {
    this.optionTable = {
      width: '101.4%',
      header: {
        data:  [
          {field: 'orderId', header: '订单编号'},
          {field: 'villageName', header: '小区名称'},
          {field: 'roomCode', header: '房间号'},
          {field: 'roomSize', header: '房间大小'},
          {field: 'surname', header: '客户姓'},
          {field: 'mobilePhone', header: '手机号'},
          {field: 'propertyActualMoneyCollection', header: '物业费金额'},
          {field: 'actualTotalMoneyCollection', header: '实收金额'},
          {field: 'month', header: '缴费月数'},
          {field: 'operating', header: '操作'},
        ],
        style: {background: this.table.tableheader.background, color: this.table.tableheader.color, height: '6vh'}
      },
      Content: {
        data: data1,
        styleone: {background: this.table.tableContent[0].background, color: this.table.tableContent[0].color, textAlign: 'center', height: '2vw'},
        styletwo: {background: this.table.tableContent[1].background, color: this.table.tableContent[1].color, textAlign: 'center', height: '2vw'},
      },
      type: 2,
      tableList:  [{label: '详情', color: this.table.detailBtn}]
    };
  }
  // set detail dialog data
  public  detailClick(e): void {
    if (e.liquidatedDamages) {
      this.dialogOption = {
        dialog: true,
        tableHidden: true,
        width: '1000',
        type: 2,
        title: '详情',
        poplist: {
          popContent: e,
          popTitle: this.detailTitle,
        },
        tablelist: {
          width: '104%',
          title: '违约金信息',
          tableHeader: {
            data: [
              {field: 'dueTimeFront', header: '季度初'},
              {field: 'dueTimeAfter', header: '季度末'},
              {field: 'days', header: '欠费天数'},
              {field: 'amountMoney', header: '金额'},
            ],
            style: {background: '#ffffff', color: '#000000', height: '6vh'},
          },
          tableContent: {
            data: JSON.parse(e.liquidatedDamages),
            styleone: {background: '#ffffff', color: '#000', textAlign: 'center', height: '2vw'},
            styletwo: {background: '#ffffff', color: '#000', textAlign: 'center', height: '2vw'}
          },
        }
      };
    } else {
      this.dialogOption = {
        dialog: true,
        tableHidden: false,
        width: '1000',
        type: 2,
        title: '详情',
        poplist: {
          popContent: e,
          popTitle:  this.detailTitle,
        }
      };
    }
  }
  // query data
  public  queryData(data): void {
    // this.SearchData.pageSize = 10;
    this.loadHidden = false;
    this.lateSrv.queryLatePaymentNoPassPageData(data).subscribe(
      value => {
        console.log(value);
        this.loadHidden = true;
        if (value.status === '1000') {
          this.latePaymentNoContents = value.data.contents;
          this.setTableOption(value.data.contents);
          this.pageOption = {total: value.data.totalRecord, row: value.data.pageSize, nowpage: value.data.pageNo};
        } else {
          this.toolSrv.setToast('error', '请求失败', value.message);
        }
      }
    );
  }
  //
  // public btnClick(e): void {
  //   this.reviewClick();
  // }
  // search data
  public  searchClick(e): void {
    if (e.type === 1) {
      this.SearchData.mobilePhone = '';
      this.SearchData.roomCode = '';
      this.queryData(this.SearchData);
    } else if (e.type === 2) {
      if (e.value === '') {
        this.toolSrv.setToast('error', '操作错误', '请输入搜索的值');
      } else {
        this.SearchData.mobilePhone = '';
        this.SearchData.roomCode = e.value;
        this.queryData(this.SearchData);
      }
    } else {
      if (e.value === '') {
        this.toolSrv.setToast('error', '操作错误', '请输入搜索的值');
      } else {
        this.SearchData.roomCode = '';
        this.SearchData.mobilePhone = e.value;
        this.queryData(this.SearchData);
      }
    }
  }
}
