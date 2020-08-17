import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../domain/user';
import { Validacoes } from '../../../../core/validator/validacoes';
import { AbstractFormComponent } from '../../../../core/components/form/abstract-form.component';
import { LoadingService } from '../../../../core/components/loading/service/loading.service';
import { PerfilService } from '../../../perfil/service/perfil.service';
import { Perfil } from '../../../perfil/domain/perfil';
import { CorreiosService } from '../../../correios/service/correios.service';
import { Correios } from '../../../correios/domain/correios';
import { MessageService } from '../../../../core/components/message/service/message.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent extends AbstractFormComponent implements OnInit {

  perfilList: Perfil[] = [];
  perfilSelected: number;
  //filteredPerfil: Perfil[] = [];

  userInfoFormGroup: FormGroup;
  userAddressFormGroup: FormGroup;
  userPasswordFormGroup: FormGroup;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private loadingService: LoadingService,
              private messageService: MessageService,
              private perfilService: PerfilService,
              private correiosService: CorreiosService) {

    super();
  }

  ngOnInit() {
    this.initForm();

    this.perfilService.findAll().subscribe(res => {
      this.perfilList = res;
    });

    const user: User = this.route.snapshot.data.user;

    if (!!user) {
      this.userInfoFormGroup.reset(user);
      this.userAddressFormGroup.reset(user.address);
      this.perfilSelected = user.perfil.idPerfil;
    } else {
      this.userPasswordFormGroup.controls['dsPassword'].setValidators([Validators.required]);
    }
  }

  initForm() {
    this.userInfoFormGroup = new FormGroup({
      idUser: new FormControl(null),
      dsName: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(5)])),
      dsEmail: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      idPerfil: new FormControl(null, Validators.required),
      dsCellPhone: new FormControl(null),
      dsCpf: new FormControl(null, Validators.compose([Validators.required, Validacoes.ValidaCpf])),
      fgActive: new FormControl(true, Validators.required)
    });

    this.userAddressFormGroup = new FormGroup({
      idAddress: new FormControl(null),
      dsCep: new FormControl(null, Validators.required),
      dsAddress: new FormControl(null, Validators.required),
      dsNumber: new FormControl(null, Validators.required),
      dsComplement: new FormControl(null),
      dsNeighborhood: new FormControl(null, Validators.required),
      dsState: new FormControl(null, Validators.required),
      dsCity: new FormControl(null, Validators.required)
    });

    this.userPasswordFormGroup = new FormGroup({
      dsPassword: new FormControl(null),
      dsConfirmPassword: new FormControl(null),
    }, {validators: this.checkPasswords});

  }

  back(): void {
    this.router.navigate(['/user']);
  }

  savePerfil(): void {

    this.loadingService.start('Salvando Usuário');

    const perfil = new Perfil();
    perfil.idPerfil = this.userInfoFormGroup.controls.idPerfil.value;

    const user: User = this.userInfoFormGroup.value;
    user.dsPassword = this.userPasswordFormGroup.controls.dsPassword.value;
    user.address = this.userAddressFormGroup.value;
    user.perfil = perfil;

    this.userService.save(user).subscribe(() => {
      this.loadingService.done();
      this.back();
    }, err => {
      this.loadingService.done();
      this.messageService.show(err.error.message);
    });

    this.loadingService.done();

  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.dsPassword.value;
    const confirmPass = group.controls.dsConfirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  findCep() {

    this.loadingService.start('Buscando CEP');

    this.correiosService.findByCep(this.userAddressFormGroup.controls['dsCep'].value).subscribe(res => {
      const correios: Correios = res;
      this.userAddressFormGroup.controls.dsAddress.setValue(correios.dsEndereco);
      this.userAddressFormGroup.controls.dsNeighborhood.setValue(correios.dsBairro);
      this.userAddressFormGroup.controls.dsState.setValue(correios.dsUf);
      this.userAddressFormGroup.controls.dsCity.setValue(correios.dsCidade);

      this.loadingService.done();
    }, error => {
      this.loadingService.done();
      this.messageService.show('Falha ao buscar o CEP, tente novamente!');
    });
  }
}
