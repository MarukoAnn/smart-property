export class RefundInfo {
  id?: any;
  orderId?: any; // 订单Id
  tollCollectorId?: any; // 收费人编号
  payerPhone?: any; // 缴费人手机号
  paymentMethod?: any; // 支付方式
  paymentType?: any; // 支付类型
  refundStatus?: any; // 退款状态
  invalidState?: any; // 失效状态
  villageCode?: any; // 小区编号
  villageName?: any; // 小区名称
  regionCode?: any; // 地块编号
  regionName?: any; // 地块名称
  buildingCode?: any; // 楼宇编号
  buildingName?: any; // 楼宇名称
  unitCode?: any; // 单元编号
  unitName?: any; // 单元名称
  userId?: any; // 客户ID
  surname?: any; // 姓氏
  mobilePhone?: any; // 姓氏
  roomCode?: any; // 房间编号
  roomSize?: any; // 房屋大小
  organizationId?: any; // 机构ID
  organizationName?: any; // 机构名称
  chargeCode?: any; // 项目编号
  chargeName?: any; // 项目名称
  actualMoneyCollection?: any; // 实收金额
  mortgageAmount?: any; // 抵扣金额
  reasonForDeduction?: any; // 抵扣原因
  refundableAmount?: any; // 可退还金额
  chargeUnit?: any; // 收费单位:物业费
  startTime?: any; // 开始日期
  dueTime?: any; // 结束日期
  delayTime?: any; // 延迟时长
  delayReason?: any; // 延期原因
  personLiable?: any; // 责任人
  personLiablePhone?: any; // 责任人电话,
  responsibleAgencies?: any; // 负责机构,
  remark?: any; // 申请退款备注,
  idt?: any; // 申请时间,
  udt?: any; // 申请更新时间,
}
export class AddRefundInfo {
  orderId?: any; // 订单Id
  payerPhone?: any; // 缴费人手机号
  payerName?: any; // 缴费人手机号
  chargeType?: any; // 缴费类型
  paymentMethod?: any; // 支付方式
  villageCode?: any; // 小区编号
  villageName?: any; // 小区名称
  regionCode?: any; // 地块编号
  regionName?: any; // 地块名称
  buildingCode?: any; // 楼宇编号
  buildingName?: any; // 楼宇名称
  unitCode?: any; // 单元编号
  unitName?: any; // 单元名称
  userId?: any; // 客户ID
  surname?: any; // 姓氏
  mobilePhone?: any; // 姓氏
  roomCode?: any; // 房间编号
  chargeCode?: any; // 项目编号
  chargeName?: any; // 项目名称
  chargeStandard?: any; // 项目单价
  chargeUnit?: any; // 收费单位
  startTime?: any; // 开始日期
  dueTime?: any; // 结束日期
  delayTime?: any; // 延迟时长
  delayReason?: any; // 延期原因
  personLiable?: any; // 责任人
  personLiablePhone?: any; // 责任人电话,
  responsibleAgencies?: any; // 负责机构,
  remark?: any; // 负责机构,
}
export class ModifyRefundInfo {
  id?: any;
  orderId?: any; // 订单Id
  tollCollectorId?: any; // 收费人编号
  payerName?: any; // 缴费人姓名
  payerPhone?: any; // 缴费人手机号
  paymentMethod?: any; // 支付方式
  paymentType?: any; // 支付类型
  refundStatus?: any; // 退款状态
  invalidState?: any; // 失效状态
  villageCode?: any; // 小区编号
  villageName?: any; // 小区名称
  regionCode?: any; // 地块编号
  regionName?: any; // 地块名称
  buildingCode?: any; // 楼宇编号
  buildingName?: any; // 楼宇名称
  unitCode?: any; // 单元编号
  unitName?: any; // 单元名称
  userId?: any; // 客户ID
  surname?: any; // 姓氏
  mobilePhone?: any; // 姓氏
  roomCode?: any; // 房间编号
  roomSize?: any; // 房屋大小
  organizationId?: any; // 机构ID
  organizationName?: any; // 机构名称
  chargeCode?: any; // 项目编号
  chargeName?: any; // 项目名称
  actualMoneyCollection?: any; // 实收金额
  mortgageAmount?: any; // 抵扣金额
  reasonForDeduction?: any; // 抵扣原因
  refundableAmount?: any; // 可退还金额
  chargeUnit?: any; // 收费单位:物业费
  startTime?: any; // 开始日期
  dueTime?: any; // 结束日期
  delayTime?: any; // 延迟时长
  delayReason?: any; // 延期原因
  personLiable?: any; // 责任人
  personLiablePhone?: any; // 责任人电话,
  responsibleAgencies?: any; // 负责机构,
  remark?: any; // 申请退款备注,
  idt?: any; // 申请时间,
  udt?: any; // 申请更新时间,
}
export class SearchRefundInfo {
  villageCode: any;
  unitCode: any;
  regionCode: any;
  buildingCode: any;
  roomCode: any;
  pageNo: any;
  pageSize: any;
  mobilePhone: any;
}
