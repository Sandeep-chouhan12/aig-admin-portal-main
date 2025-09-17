import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  OnInit,
  inject,
  EnvironmentInjector,
  EffectRef,
  effect
} from '@angular/core';
import { PermissionManagementService } from '../../services/permission-management.service';
import { PermissionTitle } from '../../models/permission-title';
import { PermissionType } from '../../models/permission-type';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit, OnDestroy {
  @Input('appHasPermission') config!: { title: PermissionTitle; accessType: PermissionType };

  private effectRef!: EffectRef;

  private readonly injector = inject(EnvironmentInjector);
  private readonly permissionService = inject(PermissionManagementService);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.injector.runInContext(() => {
      this.effectRef = effect(() => {
        this.viewContainer.clear();

        const { title, accessType } = this.config || {};
        if (!title || !accessType) return;

        const hasPermission = this.permissionService.hasPermission(title, accessType);
        if (hasPermission) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
    });
  }



  ngOnDestroy(): void {
    this.effectRef?.destroy();
  }

}
