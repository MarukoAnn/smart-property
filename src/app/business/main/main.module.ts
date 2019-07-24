import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import {MainRoutingModule} from './main-routing.module';
import { MainEventComponent } from './main-event/main-event.component';
import { MainStatisComponent } from './main-statis/main-statis.component';
import {EchartsBarModule} from '../../common/components/echarts-bar/echarts-bar.module';
import {EchartsPieModule} from '../../common/components/echarts-pie/echarts-pie.module';
import {TableModule} from 'primeng/table';
import {ScrollPanelModule} from 'primeng/primeng';


@NgModule({
  declarations: [
    MainComponent,
    MainEventComponent,
    MainStatisComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    EchartsBarModule,
    EchartsPieModule,
    TableModule,
    ScrollPanelModule,
  ]
})
export class MainModule { }
