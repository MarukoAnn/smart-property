import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AddParkingspace, ModifyParkingspace, Parkingspace} from '../../../common/model/bf-parkingspace.model';
import {BfParkingSpaceService} from '../../../common/services/bf-parking-space.service';
import {GlobalService} from '../../../common/services/global.service';
import {PublicMethedService} from '../../../common/public/public-methed.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {SharedServiceService} from '../../../common/public/shared-service.service';
import {FileOption} from '../../../common/components/basic-dialog/basic-dialog.model';
import {LocalStorageService} from '../../../common/services/local-storage.service';

@Component({
  selector: 'rbi-bf-parkingspace',
  templateUrl: './bf-parkingspace.component.html',
  styleUrls: ['./bf-parkingspace.component.less']
})
export class BfParkingspaceComponent implements OnInit, OnDestroy {

  public parkingSpaceContent: any;
  public parkingspaceSelect: any[];

  public parkingSpaceOption: any;
  // 下拉框列表
  public parkSpaceNatureOption: any[] = [];
  public parkSpaceTypeOption: any[] = [];
  public parkSpacePlaceOption: any[] = [];
  // 添加相关
  public parkingspaceAddDialog: boolean;
  public parkingspaceAdd: AddParkingspace = new AddParkingspace();
  // 修改相关
  public parkingspaceModifayDialog: boolean;
  public parkingspaceModify: ModifyParkingspace = new ModifyParkingspace();

  public parkSpaceTypemodify: any;
  public parkSpaceNaturemodify: any;
  public parkSpaceCode: any;
  // 详情相关
  public parkingSpaceDetailOption: any;
  public parkingspaceDetailDialog: boolean;
  public parkingspaceDetail: Parkingspace = new Parkingspace();
  public  SearchData = {
      villageCode: '',
      regionCode: '',
      buildingCode:  '',
      unitCode: '',
      roomCode: ''
  };
  public deleteIds: any[] = [];
  public option: any;
  public loadHidden = true;
  // 按钮显示相关
  public btnHiden = [
    {label: '新增', hidden: true},
    {label: '修改', hidden: true},
    {label: '删除', hidden: true},
    {label: '导入', hidden: true},
    // {label: '搜索', hidden: true},
  ];
  // 文件上传相关
  public UploadFileOption: FileOption = new FileOption();
  public uploadRecordOption: any;
  // 其他相关
  public nowPage = 1;
  public themeSub: Subscription;
  public table = {
    tableheader: {background: '', color: ''},
    tableContent: [
      {background: '', color: ''},
      {background: '', color: ''}],
    detailBtn: ''
  };
  public parkspaceSub: Subscription;
  // public msgs: Message[] = []; // 消息弹窗
  constructor(
    private parkingSpaceSrv: BfParkingSpaceService,
    private toolSrv: PublicMethedService,
    private globalSrv: GlobalService,
    private localSrv: LocalStorageService,
    private themeSrv: ThemeService,
    private sharedSrv: SharedServiceService,
  ) {
    this.themeSub = this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.parkingSpaceContent);
      }
    );
    this.parkspaceSub = this.sharedSrv.changeEmitted$.subscribe(
      value => {
        this.SearchData.villageCode = value.villageCode;
        this.SearchData.regionCode = value.regionCode;
        this.SearchData.buildingCode = value.buildingCode;
      }
    );
  }

  ngOnInit() {
    this.setBtnIsHidden();
    if (this.themeSrv.setTheme !== undefined) {
      this.table.tableheader = this.themeSrv.setTheme.table.header;
      this.table.tableContent = this.themeSrv.setTheme.table.content;
      this.table.detailBtn = this.themeSrv.setTheme.table.detailBtn;
    }
    if (this.sharedSrv.SearchData !== undefined) {
      this.SearchData.buildingCode = this.sharedSrv.SearchData.buildingCode;
      this.SearchData.regionCode = this.sharedSrv.SearchData.regionCode;
      this.SearchData.villageCode = this.sharedSrv.SearchData.villageCode;
    }
    this.parkingspaceInitialization();
  }
  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
    this.parkspaceSub.unsubscribe();
  }
  // initialization parkingspace
  public parkingspaceInitialization(): void {
    this.loadHidden = false;
    this.toolSrv.getAdmStatus([{settingType: 'CWLX'}, {settingType: 'CWXZ'}, {settingType: 'PAEKING_SPACE_PLACE'}], (data) => {
       console.log(data);
       this.parkSpaceNatureOption = this.toolSrv.setListMap(data.CWXZ);
       this.parkSpaceTypeOption = this.toolSrv.setListMap(data.CWLX);
       this.parkSpacePlaceOption = this.toolSrv.setListMap(data.PAEKING_SPACE_PLACE);
    });
    this.queryParkingSpacePageData();
  }
  // show add parkingspace dialog
  public parkingspaceAddClick(): void {
   if (this.SearchData.regionCode !== '') {
     this.parkingspaceAddDialog = true;
   } else {
     this.toolSrv.setToast('error', '操作错误', '请选择地块或者楼栋');
   }
  }
  // sure add parkingspace
  public parkingspaceAddSureClick(): void {
    this.parkingspaceAdd.villageCode = this.SearchData.villageCode;
    this.parkingspaceAdd.regionCode = this.SearchData.regionCode;
    this.parkingspaceAdd.buildingCode = this.SearchData.buildingCode;
    console.log(this.parkingspaceAdd);
    // var
    // this.parkingspaceAdd.parkingSpaceCode = this.parkingspaceAdd.regionCode + '-' + this.parkSpaceCode;
    // console.log(  this.parkingspaceAdd);
    this.toolSrv.setConfirmation('增加', '增加', () => {
      this.parkingSpaceSrv.addParkingSpace(this.parkingspaceAdd).subscribe(
        value => {
          if (value.status === '1000') {
            this.toolSrv.setToast('success', '操作成功', value.message);
            this.clearData();
            this.parkingspaceAddDialog = false;
            this.parkingspaceInitialization();

          }else  {
            this.toolSrv.setToast('error', '操作失败', value.message);
          }
        }
      );
    });
  }
   // show  parkingspace detail dialog
  public parkingspaceDetailClick(e): void {
    // this.parkingspaceDetail = e;
    this.parkingSpaceDetailOption = {
      dialog: true,
      tableHidden: false,
      width: '1000',
      type: 1,
      title: '详情',
      poplist: {
        popContent: e,
        popTitle:  [
          {field: 'organizationName', header: '组织名称'},
          {field: 'villageName', header: '小区名称'},
          {field: 'regionName', header: '地块名称'},
          {field: 'parkingSpaceCode', header: '车位编号'},
          {field: 'parkingSpaceArea', header: '车位面积'},
          {field: 'parkingSpaceType', header: '车位类型'},
          {field: 'floor', header: '车位楼层'},
          {field: 'parkingSpacePlace', header: '车位地点'},
          {field: 'parkingSpaceNature', header: '车位性质'},
          {field: 'vehicleCapacity', header: '车位容车数量'},
          {field: 'currentCapacity', header: '车位当前容车数量'},
        ],
      }
    };

  }
  // show modify parkingspace dialog
   public parkingspaceModifyClick(): void {
    if (this.parkingspaceSelect === undefined || this.parkingspaceSelect.length === 0) {
     this.toolSrv.setToast('error', '操作错误', '请选择需要修改的项');
    } else if (this.parkingspaceSelect.length === 1) {
      this.parkingspaceSelect[0].parkingSpaceNature = this.toolSrv.setLabelToValue(this.parkSpaceNatureOption,  this.parkingspaceSelect[0].parkingSpaceNature);
      this.parkingspaceSelect[0].parkingSpaceType = this.toolSrv.setLabelToValue(this.parkSpaceTypeOption,  this.parkingspaceSelect[0].parkingSpaceType);
      this.parkingspaceModify = this.parkingspaceSelect[0];
      console.log(this.parkingspaceSelect);
      this.parkingspaceModifayDialog = true;
    } else {
      this.toolSrv.setToast('error', '操作错误', '只能选择一项进行修改');
    }
  }

  // sure modify parkingspace
  public parkingspaceModifySureClick(): void {
    // console.log(this.parkingspaceModify);
    // this.parkingspaceModify.parkingSpaceCode = this.parkingspaceModify.parkingSpaceCode.slice(this.parkingspaceModify.parkingSpaceCode.lastIndexOf('-') + 1, this.parkingspaceModify.parkingSpaceCode.length);
    console.log(this.parkingspaceModify);
    this.toolSrv.setConfirmation('修改', '修改', () => {
      this.parkingSpaceSrv.updateParkingSpace(this.parkingspaceModify).subscribe(
        value => {
          console.log(value);
          if (value.status === '1000') {
            this.toolSrv.setToast('success', '操作成功', value.message);
            this.parkingspaceModifayDialog = false;
            this.clearData();
            this.parkingspaceInitialization();
          }
        }
      );
    });
  }

  // Delete parking space information
  public parkingspaceDeleteClick(): void {
    if (this.parkingspaceSelect === undefined || this.parkingspaceSelect.length === 0) {
      this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');
    } else {
      this.toolSrv.setConfirmation('删除', `删除这${this.parkingspaceSelect.length}项`, () => {
        this.parkingspaceSelect.forEach( v => {
          this.deleteIds.push(v.parkingSpaceInfoId);
        });
        this.parkingSpaceSrv.daleteParkingSpace({ids: this.deleteIds.join(',')}).subscribe(
          value => {
            if (value.status === '1000' ) {
              this.toolSrv.setToast('success', '操作成功', value.message);
              this.clearData();
              this.parkingspaceInitialization();
            }
          }
        );
      });
    }
  }
  // Reset data
  public clearData(): void {
    this.parkingspaceAdd = new AddParkingspace();
    this.parkingspaceModify = new ModifyParkingspace();
    this.parkingspaceSelect = [];
    this.parkSpaceTypemodify = null;
    this.parkSpaceNaturemodify = null;
  }
  // paging query
  public nowpageEventHandle(event: any): void {
    this.loadHidden = false;
    this.nowPage = event;
    this.queryParkingSpacePageData();
    this.parkingspaceSelect = [];
  }
  public  queryParkingSpacePageData(): void {
    this.parkingSpaceSrv.queryParkingSpace({pageNo: this.nowPage, pageSize: 10}).subscribe(
      value => {
        this.loadHidden = true;
        value.data.contents.forEach( v => {
          v.parkingSpaceNature = this.toolSrv.setValueToLabel(this.parkSpaceNatureOption, v.parkingSpaceNature);
          v.parkingSpaceType = this.toolSrv.setValueToLabel(this.parkSpaceTypeOption, v.parkingSpaceType);
          v.parkingSpacePlace = this.toolSrv.setValueToLabel(this.parkSpacePlaceOption, v.parkingSpacePlace);
        });
        this.parkingSpaceContent = value.data.contents;
        this.setTableOption(value.data.contents);
        this.option = {total: value.data.totalRecord, row: value.data.pageSize, nowpage: value.data.pageNo};
      }
    );
  }

  // select data
  public selectData(e): void {
    this.parkingspaceSelect = e;
  }
  // 设置表格
  public  setTableOption(data1): void {
    this.parkingSpaceOption = {
      width: '101.4%',
      header: {
        data: [
          {field: 'villageName', header: '小区名称'},
          {field: 'regionName', header: '地块名称'},
          {field: 'buildingName', header: '楼栋名称'},
          {field: 'parkingSpaceCode', header: '车位编号'},
          {field: 'parkingSpaceArea', header: '车位面积'},
          {field: 'vehicleCapacity', header: '车位容车数量'},
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

  // 上传文件
  public  ownerUploadSureClick(e): void {
    if (e.getAll('file').length !== 0) {
      this.parkingSpaceSrv.importFileWithParkSpace(e).subscribe(
        (value) => {
          console.log(value);
          if (value.status === '1000') {
            // this.uploadedFiles = [];
            this.UploadFileOption.files = [];
            this.uploadRecordOption = {
              width: '900',
              dialog: true,
              title: '上传记录',
              totalNumber: value.data.totalNumber,
              realNumber: value.data.realNumber,
              uploadOption: {
                width: '102%',
                tableHeader: {
                  data: [
                    {field: 'code', header: '序号'},
                    {field: 'parkingSpaceCodes', header: '车位编号'},
                    {field: 'result', header: '结果'},
                    {field: 'remarks', header: '备注'},
                  ],
                  style: { background: '#F4F4F4', color: '#000', height: '6vh'}
                },
                tableContent: {
                  data: value.data.logParkingSpaceInfoDOS,
                  styleone: { background: '#FFFFFF', color: '#000', height: '2vw', textAlign: 'center'},
                  styletwo: { background: '#FFFFFF', color: '#000', height: '2vw', textAlign: 'center'}
                }
              }
            };
            // this.ownerInfoDialog = true;
            this.toolSrv.setToast('success', '上传成功', value.message);
            // this.ownerInitialization();
          } else {
            console.log(123);
            this.toolSrv.setToast('error', '上传失败', value.message);
          }
        }
      );
    } else {
      this.toolSrv.setToast('error', '操作失败', '请选择需要上传的文件');
    }
  }

  public  parkingSpaceFileImportClick(): void {
    this.UploadFileOption.width = '800';
    this.UploadFileOption.dialog = true;
    this.UploadFileOption.files = [];
  }

  // 设置按钮显示隐藏
  public  setBtnIsHidden(): void {
    this.localSrv.getObject('btnParentCodeList').forEach(v => {
      if (v.label === '车位信息') {
        this.globalSrv.getChildrenRouter({parentCode: v.parentCode}).subscribe(value => {
          // console.log(value);
          value.data.forEach(v => {
            this.btnHiden.forEach( val => {
              if (v.title === val.label) {
                val.hidden = false;
              }
            });
          });
        });
      }
    });
  }
}
