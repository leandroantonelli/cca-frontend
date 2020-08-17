import { Component, OnInit } from '@angular/core';
import { Perfil } from '../../domain/perfil';
import { PerfilService } from '../../service/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmService } from '../../../../core/components/dialog/confirm/service/dialog-confirm.service';
import { LoadingService } from '../../../../core/components/loading/service/loading.service';
import { MessageService } from '../../../../core/components/message/service/message.service';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.scss']
})
export class PerfilListComponent implements OnInit {

  columnsPerfil: string[] = ['name', 'id'];
  perfilList: Perfil[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private perfilService: PerfilService,
              private dialogConfirmService: DialogConfirmService,
              private loadingService: LoadingService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadPerfis();
  }

  loadPerfis(): void {
    this.perfilService.findAll().subscribe(res => {
      this.perfilList = res;
    });
  }

  addPerfil(): void {
    this.router.navigate(['./add'], {relativeTo: this.route});
  }

  editPerfil(perfil: Perfil): void {
    this.router.navigate(['./', perfil.idPerfil], {relativeTo: this.route});
  }

  deletePerfil(perfil: Perfil): void {
    this.dialogConfirmService.show('Remover', 'Deseja remover o perfil?', '350px').subscribe(result => {
      if (result) {
        this.loadingService.start('Removendo Atributo');
        this.perfilService.delete(perfil.idPerfil).subscribe(() => {
          this.loadPerfis();
          this.loadingService.done();
        }, err => {
          this.loadingService.done();
          this.messageService.show(err.error.message);
        });
      }
    });
  }

}
