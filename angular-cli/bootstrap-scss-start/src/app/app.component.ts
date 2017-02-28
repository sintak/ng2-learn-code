import { Component, OnInit } from '@angular/core';
let md5 = require('md5');
// declare var $: any;
// import * as $ from 'jquery';  // ok
import 'jquery';

// let moment = require('moment');
import { Moment } from 'moment/moment';
// declare var moment: any;  // at angular-cli.json

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  get startTime(): Moment {
    return $('#datetimepicker1').data("DateTimePicker").date();
  }
  get endTime(): Moment {
    return $('#datetimepicker2').data("DateTimePicker").date();
  }

  async ngOnInit(): Promise<void> {

    let test = await Promise.resolve();
    
    console.log(md5('password'));
    // console.log(moment());
    $(function () {

      let defStartDate = new Date();
      defStartDate.setDate(1);
      defStartDate.setHours(0);
      defStartDate.setMinutes(0);
      defStartDate.setSeconds(0);
      /* tslint:disable */
      $('#datetimepicker1').datetimepicker({
        // locale: 'en-au',
        // useCurrent: false,
        format: 'YYYY-MM-DD HH:mm:ss',
        defaultDate: defStartDate
      });
      /* tslint:enable */

      let defEndDate = new Date();
      defEndDate.setHours(23);
      defEndDate.setMinutes(59);
      defEndDate.setSeconds(59);
      /* tslint:disable */
      $('#datetimepicker2').datetimepicker(
        {
          // locale: 'zh-cn',
          format: 'YYYY-MM-DD HH:mm:ss',
          defaultDate: defEndDate
        }
      );
      
      $('#datetimepicker1').on('dp.change', function (e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
      });

      $('#datetimepicker2').on('dp.change', function (e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
      });
      /* tslint:enable */

    });
  }

  getDateTime(): void {
    console.info(this.startTime.date());
    console.info(this.endTime.date());

  }
}
