import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../service/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDTO } from '../../../menu/domain/menu-dto';
import { MessageService } from '../../../../core/components/message/service/message.service';
import { Perfil } from '../../domain/perfil';
import { AbstractFormComponent } from '../../../../core/components/form/abstract-form.component';
import { LoadingService } from '../../../../core/components/loading/service/loading.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent extends AbstractFormComponent implements OnInit {

  perfilFormGroup: FormGroup;

  menuList: MenuDTO[] = [];

  constructor(private perfilService: PerfilService,
              private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService,
              private loadingService: LoadingService) {

    super();
  }

  ngOnInit(): void {
    this.initForm();

    const perfil: Perfil = this.route.snapshot.data.perfil;

    if (!!perfil) {
      this.perfilFormGroup.reset(perfil);
      this.menuList = perfil.menus;
    } else {
      this.perfilService.findAllMenus().subscribe(res => {
        this.menuList = res;
      });
    }
  }

  initForm(): void {
    this.perfilFormGroup = new FormGroup({
      idPerfil: new FormControl(null),
      dsName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      menus: new FormControl(null)
    });
  }

  back(): void {
    this.router.navigate(['/perfil']);
  }

  savePerfil(): void {

    this.loadingService.start('Salvando Perfil');

    const menuTemp: MenuDTO[] = this.menuList.filter(value => value.fgChecked === true);

    if (menuTemp.length === 0) {
      this.loadingService.done();
      this.messageService.show('Selecione ao menos um Menu a ser liberado.');
      return;
    }

    this.perfilFormGroup.controls.menus.setValue(this.menuList);

    this.perfilService.save(this.perfilFormGroup.value).subscribe(() => {
      this.loadingService.done();
      this.back();
    }, err => {
      this.loadingService.done();
      this.messageService.show(err.error.message);
    });

  }

  selectMenu(fgChecked: boolean, menu: MenuDTO): void {

    this.menuList.forEach(m => {

      if (m.idMenu === menu.idMenu) {

        m.fgChecked = fgChecked;

        if (m.menuList.length > 0) {
          m.menuList.forEach(mChild => mChild.fgChecked = fgChecked);
        }

      }

    });
  }

  selectMenuChild(fgChecked: boolean, menuChild: MenuDTO, menuFather: MenuDTO): void {

    this.menuList.forEach(menu => {

      if (menu.idMenu === menuFather.idMenu) {

        menu.menuList.forEach(mChild => {

          if (mChild.idMenu === menuChild.idMenu) {
            mChild.fgChecked = fgChecked;
          }

        });

        const menuTemp: MenuDTO[] = menu.menuList.filter(value => value.fgChecked === true);

        menu.fgChecked = menuTemp.length > 0;

      }
    });
  }
}
