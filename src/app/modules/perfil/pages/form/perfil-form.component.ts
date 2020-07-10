import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../service/perfil.service';
import { MenuDTO } from '../../../menu/domain/menu-dto';
import { Perfil } from '../../domain/perfil';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent implements OnInit {

  menuList: MenuDTO[] = [];
  formGroup: FormGroup;
  perfil: Perfil;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private perfilService: PerfilService) {

  }

  ngOnInit(): void {

    this.loadMenus();

    this.formGroup = this.formBuilder.group({
      dsName: [null, Validators.compose([Validators.required, Validators.min(1)])]
    });

  }

  loadMenus() {

    this.perfilService.findAllMenus().subscribe(res => {
      this.menuList = res;

      console.log(this.menuList);
    });

  }

  cancel() {
    this.router.navigate(['/perfil']);
  }

  addPerfil() {

  }
}
