import { Component, AfterViewInit } from '@angular/core';
import { AppService, UtilityService, SettingService } from '../../../../services';

@Component({
  selector: 'app-theme',
  template: `
    <div class="iq-colorbox color-fix">
      <div class="buy-button" (click)="openThemePicker()">
        <a class="color-full">
        <mat-icon aria-hidden="false">adjust</mat-icon>
        </a>
      </div>
      <div class="clearfix color-picker">
        <ul class="iq-colorselect clearfix">
          <li
            *ngFor="let theme of this.themeOptions(); let i = index"
            [ngClass]="'color-' + (i + 1)"
            [class.selectedTheme]="theme === defaultTheme"
            [attr.data-style]="'iq-color-' + ( i+1 )"
            [attr.data-color]="theme"
            (click)="setTheme(theme, true)">
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: []
})
export class ThemeComponent implements AfterViewInit {

  jQuery: any = this.utilityService.JQuery;
  defaultTheme = this.appService.ROOT_STATE.config.theme;
  fn: (iqColor: string) => void = this.appService.setTheme;

  constructor(
    private appService: AppService,
    private utilityService: UtilityService,
    private settingService: SettingService
  ) {}

  ngAfterViewInit(): void {
    this.sidemenuJs();
    this.setTheme(this.defaultTheme);
  }

  sidemenuJs(): void {
    const jQuery = this.jQuery;
    /*---------------------------------------------------------------------
    Sidebar Widget
    -----------------------------------------------------------------------*/
    jQuery('.iq-sidebar-menu .active').each(function() {
      jQuery(this).find('.iq-submenu').addClass('show');
      jQuery(this).addClass('active-menu');
      jQuery(this).next().attr('aria-expanded', 'true');
    });
    jQuery(document).on('click', '.iq-menu > li > a', function() {
      jQuery('.iq-menu > li > a').parent().removeClass('active');
      jQuery(this).parent().addClass('active');
    });
    jQuery('.wrapper-menu').click(function() {
      jQuery(this).toggleClass('open');
      jQuery('body').toggleClass('sidebar-main');
    });
  }

  openThemePicker(){
    const jQuery = this.jQuery;
    const styleSwitcher = jQuery('.iq-colorbox');
    const panelWidth = styleSwitcher.outerWidth(true);
    if (jQuery('.iq-colorbox.color-fix').length > 0) {
      styleSwitcher.animate({ right: '0px' });
      jQuery('.iq-colorbox.color-fix').removeClass('color-fix');
      jQuery('.iq-colorbox').addClass('opened');
    } else {
      jQuery('.iq-colorbox.opened').removeClass('opened');
      jQuery('.iq-colorbox').addClass('color-fix');
      styleSwitcher.animate({ right: '-' + panelWidth });
    }
    return false;
  }

  setTheme(theme: string, onDemand: boolean = false){
    this.defaultTheme = theme;
    this.appService.setTheme(theme);
    if(onDemand){
      this.settingService.update({ theme })
      .subscribe();
    }
  }

  themeOptions(): string[] {
    return [
      'rgb(30, 61, 115)',
      'rgb(2, 216, 113)',
      'rgb(48, 156, 243)',
      'rgb(255, 0, 255)',
      'rgb(251, 31, 76)',
      'rgb(0, 206, 209)',
      'rgb(243, 95, 59)',
      'rgb(253, 225, 23)',
      'rgb(255, 0, 0)',
      'rgb(136, 2, 140)',
      'rgb(0, 213, 171)',
      'rgb(206, 146, 82)',
      'rgb(249, 174, 2)',
      'rgb(30, 127, 228)',
      'rgb(0, 100, 0)',
      'rgb(250, 124, 4)',
      'rgb(129, 191, 2)',
      'rgb(153, 167, 202)',
      'rgb(61, 42, 38)',
      'rgb(160, 116, 107)'
    ];
  }
}
