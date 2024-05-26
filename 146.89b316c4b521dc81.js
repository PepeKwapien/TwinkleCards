"use strict";(self.webpackChunkTwinkleCards=self.webpackChunkTwinkleCards||[]).push([[146],{7146:(ee,C,p)=>{p.r(C),p.d(C,{HomeModule:()=>X});var u=p(6814),b=p(9805),e=p(6689),v=p(361),d=p(8727),T=p(6663),s=p(5861),G=p(3451),m=p(7038);let _=(()=>{class n{get _userId(){return this._authService.userId}constructor(o,t,l){this._authService=o,this._userRepository=t,this._collectionRepository=l}createCollectionGroup(o){var t=this;return(0,s.Z)(function*(){yield t._userRepository.createCollectionGroup(t._userId,o)})()}editCollectionGroup(o,t){var l=this;return(0,s.Z)(function*(){yield l._userRepository.editCollectionGroup(l._userId,o,t)})()}deleteCollectionGroup(o){var t=this;return(0,s.Z)(function*(){yield t._userRepository.deleteCollectionGroup(t._userId,o)})()}createCollectionReference(o,t,l){var i=this;return(0,s.Z)(function*(){yield i._userRepository.createCollectionReference(i._userId,o,t,l)})()}updateCollectionReference(o,t,l){var i=this;return(0,s.Z)(function*(){yield i._userRepository.updateCollectionReference(i._userId,o,t,l)})()}deleteCollectionReference(o,t){var l=this;return(0,s.Z)(function*(){yield l._userRepository.deleteCollectionReference(l._userId,o,t)})()}createCollection(o){var t=this;return(0,s.Z)(function*(){return yield t._collectionRepository.createCollection(t._userId,o)})()}static#e=this.\u0275fac=function(t){return new(t||n)(e.LFG(v.e),e.LFG(G.E),e.LFG(m.G))};static#o=this.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var r=p(95);let g=(()=>{class n{get formGroup(){return this._formGroup}constructor(o,t,l,i){this._formBuilder=o,this._modalService=t,this._userIdInterceptor=l,this._collectionRepository=i,this._formGroup=this._formBuilder.group({name:["",r.kI.required],description:[""],isPublic:[!1],type:["",r.kI.required],group:["",r.kI.required]})}createCollection(){var o=this;return(0,s.Z)(function*(){if(!o._formGroup.valid)return;const t=o._formGroup.value,l=yield o._userIdInterceptor.createCollection(t);yield o._userIdInterceptor.createCollectionReference(t.group,l,t.name),o._modalService.close()})()}updateCollection(o){var t=this;return(0,s.Z)(function*(){const l=t._formGroup.value;yield t._collectionRepository.updateCollection(o,l),yield t._userIdInterceptor.updateCollectionReference(l.group,o,l.name)})()}setCollectionGroup(o){this._formGroup.patchValue({group:o})}patchFormGroupValue(o){this._formGroup.patchValue(o)}resetFormGroup(){this._formGroup.reset({isPublic:!1,description:null})}static#e=this.\u0275fac=function(t){return new(t||n)(e.LFG(r.qu),e.LFG(d.Z),e.LFG(_),e.LFG(m.G))};static#o=this.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),f=(()=>{class n{get formGroup(){return this._formGroup}constructor(o,t,l){this._userIdInterceptorService=o,this._formBuilder=t,this._modalService=l,this._formGroup=this._formBuilder.group({name:["",[r.kI.required,r.kI.minLength(1)]],color:["",r.kI.required]})}createCollectionGroup(){var o=this;return(0,s.Z)(function*(){o._formGroup.valid&&(yield o._userIdInterceptorService.createCollectionGroup(o._formGroup.value),o._modalService.close())})()}editCollectionGroup(o){var t=this;return(0,s.Z)(function*(){t._formGroup.valid&&(yield t._userIdInterceptorService.editCollectionGroup(o,t._formGroup.value),t._modalService.close())})()}resetFormGroup(){this._formGroup.reset()}static#e=this.\u0275fac=function(t){return new(t||n)(e.LFG(_),e.LFG(r.qu),e.LFG(d.Z))};static#o=this.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var y=function(n){return n[n.pink=0]="pink",n[n.green=1]="green",n[n.yellow=2]="yellow",n[n.blue=3]="blue",n}(y||{});function F(n,c){if(1&n){const o=e.EpF();e.TgZ(0,"input",9),e.NdJ("change",function(){const i=e.CHM(o).$implicit,a=e.oxw();return e.KtG(a.changeColor(i))}),e.qZA()}if(2&n){const o=c.$implicit;e.Tol(o),e.Q6J("id",o)("value",o)}}let x=(()=>{class n{get formGroup(){return this._collectionFormGorupService.formGroup}get colors(){return Object.keys(y).filter(o=>isNaN(+o))}constructor(o){this._collectionFormGorupService=o}ngOnDestroy(){this._collectionFormGorupService.resetFormGroup()}changeColor(o){this.formGroup.patchValue({color:o})}callback(o){var t=this;return(0,s.Z)(function*(){o.preventDefault(),yield t.buttonCallback()})()}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(f))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-collection-group-form-body"]],inputs:{buttonTemplate:"buttonTemplate",buttonCallback:"buttonCallback"},decls:11,vars:3,consts:[[1,"form-inner-container",3,"formGroup","ngSubmit"],[1,"form-body"],["for","collection-group-name"],["id","collection-group-name","type","text","formControlName","name","autocomplete","off"],["for","color"],[1,"color-radio-button-container"],["type","radio","name","color","formControlName","color",3,"id","value","class","change",4,"ngFor","ngForOf"],["type","submit"],[3,"ngTemplateOutlet"],["type","radio","name","color","formControlName","color",3,"id","value","change"]],template:function(t,l){1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(a){return l.callback(a)}),e.TgZ(1,"div",1)(2,"label",2),e._uU(3,"Name:"),e.qZA(),e._UZ(4,"input",3),e.TgZ(5,"label",4),e._uU(6,"Color:"),e.qZA(),e.TgZ(7,"div",5),e.YNc(8,F,1,4,"input",6),e.qZA()(),e.TgZ(9,"button",7),e.GkF(10,8),e.qZA()()),2&t&&(e.Q6J("formGroup",l.formGroup),e.xp6(8),e.Q6J("ngForOf",l.colors),e.xp6(2),e.Q6J("ngTemplateOutlet",l.buttonTemplate))},dependencies:[u.sg,u.tP,r._Y,r.Fj,r._,r.JJ,r.JL,r.sg,r.u]})}return n})();function O(n,c){1&n&&(e._uU(0,"Save "),e._UZ(1,"img",3))}let k=(()=>{class n{constructor(o){this._collectionFormGorupService=o}ngOnInit(){this._collectionFormGorupService.formGroup.patchValue({name:this.collectionGroup.name,color:this.collectionGroup.color})}editCollectionGroupCallback(){var o=this;return(0,s.Z)(function*(){yield o._collectionFormGorupService.editCollectionGroup(o.collectionGroup)})}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(f))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-edit-collection-group-form"]],inputs:{collectionGroup:"collectionGroup"},decls:6,vars:2,consts:[[1,"form-outer-container","light-box-shadow"],[3,"buttonTemplate","buttonCallback"],["button",""],["src","./assets/edit.svg",1,"inverted-black-icon"]],template:function(t,l){if(1&t&&(e.TgZ(0,"div",0)(1,"h3"),e._uU(2,"Edit collection group"),e.qZA(),e._UZ(3,"app-collection-group-form-body",1),e.qZA(),e.YNc(4,O,2,0,"ng-template",null,2,e.W1O)),2&t){const i=e.MAs(5);e.xp6(3),e.Q6J("buttonTemplate",i)("buttonCallback",l.editCollectionGroupCallback())}},dependencies:[x]})}return n})();function M(n,c){1&n&&(e.ynx(0),e.TgZ(1,"label",11),e._uU(2,"Collection type:"),e.qZA(),e.TgZ(3,"div",12)(4,"label"),e._UZ(5,"input",13),e.TgZ(6,"div",14)(7,"div",15)(8,"h4"),e._uU(9,"Term"),e.qZA()(),e._UZ(10,"img",16),e.TgZ(11,"div",15)(12,"p"),e._uU(13,"Definition"),e.qZA()()()(),e.TgZ(14,"label"),e._UZ(15,"input",17),e.TgZ(16,"div",14)(17,"div",15)(18,"h4"),e._uU(19,"Word"),e.qZA(),e.TgZ(20,"p"),e._uU(21,"Example use"),e.qZA()(),e._UZ(22,"img",16),e.TgZ(23,"div",15)(24,"h4"),e._uU(25,"Translation"),e.qZA(),e.TgZ(26,"p"),e._uU(27,"Translated use"),e.qZA()()()()(),e.BQk())}function w(n,c){if(1&n&&(e.TgZ(0,"option",18),e._uU(1),e.qZA()),2&n){const o=c.$implicit;e.Q6J("value",o),e.xp6(1),e.Oqu(o)}}let Z=(()=>{class n{get formGroup(){return this._collectionFormService.formGroup}get collectionGroups(){return this._userRepository.userCollectionGroupNames}constructor(o,t){this._collectionFormService=o,this._userRepository=t,this.editForm=!1}ngOnDestroy(){this._collectionFormService.resetFormGroup()}callback(o){var t=this;return(0,s.Z)(function*(){o.preventDefault(),yield t.buttonCallback()})()}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(g),e.Y36(G.E))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-collection-form-body"]],inputs:{buttonTemplate:"buttonTemplate",buttonCallback:"buttonCallback",editForm:"editForm"},decls:15,vars:4,consts:[[1,"form-inner-container",3,"formGroup","ngSubmit"],[1,"form-body"],["for","collection-name"],["id","collection-name","type","text","formControlName","name","autocomplete","off"],["for","collection-description"],["id","collection-description","formControlName","description","autocomplete","off","placeholder","Optional"],[4,"ngIf"],["name","group","id","group","formControlName","group"],[3,"value",4,"ngFor","ngForOf"],["type","submit"],[3,"ngTemplateOutlet"],["for","type"],[1,"collection-type-container"],["type","radio","name","type","id","definition","value","definition","formControlName","type"],[1,"collection-type-option-container"],[1,"collection-type-example-container"],["src","./assets/swap-horiz.svg"],["type","radio","name","type","id","translation","value","translation","formControlName","type"],[3,"value"]],template:function(t,l){1&t&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(a){return l.callback(a)}),e.TgZ(1,"div",1)(2,"label",2),e._uU(3,"Name:"),e.qZA(),e._UZ(4,"input",3),e.TgZ(5,"label",4),e._uU(6,"Description:"),e.qZA(),e._UZ(7,"textarea",5),e.YNc(8,M,28,0,"ng-container",6),e.TgZ(9,"label",2),e._uU(10,"Group:"),e.qZA(),e.TgZ(11,"select",7),e.YNc(12,w,2,2,"option",8),e.qZA()(),e.TgZ(13,"button",9),e.GkF(14,10),e.qZA()()),2&t&&(e.Q6J("formGroup",l.formGroup),e.xp6(8),e.Q6J("ngIf",!l.editForm),e.xp6(4),e.Q6J("ngForOf",l.collectionGroups),e.xp6(2),e.Q6J("ngTemplateOutlet",l.buttonTemplate))},dependencies:[u.sg,u.O5,u.tP,r._Y,r.YN,r.Kr,r.Fj,r.EJ,r._,r.JJ,r.JL,r.sg,r.u],styles:["form.ng-submitted.ng-invalid[_ngcontent-%COMP%]   .collection-type-container[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:has(input.ng-invalid){border-color:#d22d2d}.collection-type-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:.5em}.collection-type-container[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]{cursor:pointer;border:2px hsla(0,0%,70%,.3) solid;border-radius:15px;background-color:#fff}.collection-type-container[_ngcontent-%COMP%] > label[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{display:none}.collection-type-container[_ngcontent-%COMP%] > label[_ngcontent-%COMP%]:has(input:checked){border-color:#666}.collection-type-option-container[_ngcontent-%COMP%]{width:100%;padding:1em;display:grid;grid-template-columns:1fr auto 1fr;grid-template-rows:4rem;align-items:center}.collection-type-example-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;row-gap:1em}.collection-type-example-container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:0}"]})}return n})();function S(n,c){1&n&&(e._uU(0,"Create "),e._UZ(1,"img",3))}let P=(()=>{class n{constructor(o){this._collectionFormService=o}createCollection(){var o=this;return(0,s.Z)(function*(){yield o._collectionFormService.createCollection()})()}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(g))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-create-collection-form"]],decls:6,vars:2,consts:[[1,"form-outer-container","light-box-shadow"],[3,"buttonTemplate","buttonCallback"],["button",""],["src","./assets/add-circle.svg",1,"inverted-black-icon"]],template:function(t,l){if(1&t&&(e.TgZ(0,"div",0)(1,"h3"),e._uU(2,"New collection"),e.qZA(),e._UZ(3,"app-collection-form-body",1),e.qZA(),e.YNc(4,S,2,0,"ng-template",null,2,e.W1O)),2&t){const i=e.MAs(5);e.xp6(3),e.Q6J("buttonTemplate",i)("buttonCallback",l.createCollection)}},dependencies:[Z]})}return n})();function U(n,c){1&n&&(e._uU(0,"Save "),e._UZ(1,"img",3))}let I=(()=>{class n{constructor(o,t,l){this._collectionFormService=o,this._collectionRepository=t,this._modalService=l}ngOnInit(){var o=this;return(0,s.Z)(function*(){const t=yield o._collectionRepository.readCollection(o.collectionReference.id);t?o._collectionFormService.patchFormGroupValue({name:o.collectionReference.name,description:t.description??null,isPublic:t.isPublic,type:t.type,group:o.collectionGroup.name}):o._modalService.close()})()}editCollectionCallback(){var o=this;return(0,s.Z)(function*(){yield o._collectionFormService.updateCollection(o.collectionReference.id),o._modalService.close()})}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(g),e.Y36(m.G),e.Y36(d.Z))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-edit-collection-form"]],inputs:{collectionReference:"collectionReference",collectionGroup:"collectionGroup"},decls:6,vars:6,consts:[[1,"form-outer-container","light-box-shadow"],[3,"buttonTemplate","buttonCallback","editForm"],["button",""],["src","./assets/edit.svg",1,"inverted-black-icon"]],template:function(t,l){if(1&t&&(e.TgZ(0,"div",0)(1,"h3"),e._uU(2),e.qZA(),e._UZ(3,"app-collection-form-body",1),e.qZA(),e.YNc(4,U,2,0,"ng-template",null,2,e.W1O)),2&t){const i=e.MAs(5);e.xp6(1),e.Tol(l.collectionGroup.color),e.xp6(1),e.hij("Edit collection ",l.collectionReference.name,""),e.xp6(1),e.Q6J("buttonTemplate",i)("buttonCallback",l.editCollectionCallback())("editForm",!0)}},dependencies:[Z]})}return n})();const A=["collectionsGrid"];function N(n,c){if(1&n){const o=e.EpF();e.TgZ(0,"button",16)(1,"div",17)(2,"button",8)(3,"img",18),e.NdJ("click",function(l){const a=e.CHM(o).$implicit,h=e.oxw(2),z=e.MAs(6);return e.KtG(h.openEditCollectionModal(l,a,z))}),e.qZA()(),e.TgZ(4,"button",8)(5,"img",19),e.NdJ("click",function(l){const a=e.CHM(o).$implicit,h=e.oxw(2);return e.KtG(h.confirmCollectionDelete(l,a))}),e.qZA()()(),e._uU(6),e.qZA()}if(2&n){const o=c.$implicit,t=c.index,l=e.oxw(2);e.Tol(l.collectionGroup.color),e.Udp("animation-delay",.1*l.indexOnScreen+.1*t+"s"),e.Q6J("routerLink","/"+o.id),e.xp6(6),e.hij(" ",o.name," ")}}const J=function(n){return{"icon-rotated-180":n}},Y=function(n){return{"collection-grid-collapsed":n}};function R(n,c){if(1&n){const o=e.EpF();e.ynx(0),e.TgZ(1,"button",4),e.NdJ("click",function(){e.CHM(o);const l=e.oxw();return e.KtG(l.toggleCollections())}),e.TgZ(2,"h1",5),e._UZ(3,"img",6),e._uU(4),e.qZA(),e.TgZ(5,"div",7)(6,"button",8)(7,"img",9),e.NdJ("click",function(l){e.CHM(o);const i=e.oxw(),a=e.MAs(4);return e.KtG(i.openModal(l,a))}),e.qZA()(),e.TgZ(8,"button",8)(9,"img",10),e.NdJ("click",function(l){e.CHM(o);const i=e.oxw();return e.KtG(i.deleteGroup(l))}),e.qZA()()()(),e.TgZ(10,"div",11,12),e.YNc(12,N,7,6,"button",13),e.TgZ(13,"button",14),e.NdJ("click",function(){e.CHM(o);const l=e.oxw(),i=e.MAs(2);return e.KtG(l.openCreateCollectionModal(i))}),e._UZ(14,"img",15),e.qZA()(),e.BQk()}if(2&n){const o=e.oxw();e.xp6(1),e.Tol(o.collectionGroup.color),e.xp6(2),e.Q6J("ngClass",e.VKq(8,J,!o.collectionsCollapsed)),e.xp6(1),e.hij("",o.collectionGroup.name," "),e.xp6(6),e.Q6J("ngClass",e.VKq(10,Y,o.collectionsCollapsed)),e.xp6(2),e.Q6J("ngForOf",o.collectionGroup.collections),e.xp6(1),e.Udp("animation-delay",.1*o.indexOnScreen+.1*o.collectionGroup.collections.length+"s")}}function q(n,c){1&n&&e._UZ(0,"app-create-collection-form")}function Q(n,c){if(1&n&&e._UZ(0,"app-edit-collection-group-form",20),2&n){const o=e.oxw();e.Q6J("collectionGroup",o.collectionGroup)}}function E(n,c){if(1&n&&e._UZ(0,"app-edit-collection-form",21),2&n){const o=e.oxw();e.Q6J("collectionGroup",o.collectionGroup)("collectionReference",o.lastEditedCollection)}}let B=(()=>{class n{get lastEditedCollection(){return this._lastEditedCollection}get collectionsCollapsed(){return this._collectionsCollapsed}constructor(o,t,l,i){this._modalService=o,this._userIdInterceptorService=t,this._collectionFormService=l,this._collectionRepository=i,this.indexOnScreen=1,this._collectionsCollapsed=!1}ngAfterViewInit(){this._manageCollectionGridMaxHeight()}toggleCollections(){this._collectionsCollapsed=!this._collectionsCollapsed,this._manageCollectionGridMaxHeight()}_manageCollectionGridMaxHeight(){this.collectionsGrid.nativeElement.style.maxHeight=this._collectionsCollapsed?0:this.collectionsGrid.nativeElement.scrollHeight+"px"}openModal(o,t){o.stopPropagation(),this._modalService.open(t)}deleteGroup(o){var t=this;return(0,s.Z)(function*(){if(o.stopPropagation(),void 0!==t.collectionGroup&&(yield t._modalService.getConfirmation({title:`Delete group '${t.collectionGroup.name}'?`,description:"This action will remove the group and all of the collections inside it",confirmation:"This is irreversible. Are you sure?",color:t.collectionGroup.color}))){for(let i of t.collectionGroup.collections)t._collectionRepository.deleteCollection(i.id);t._userIdInterceptorService.deleteCollectionGroup(t.collectionGroup)}})()}openEditCollectionModal(o,t,l){o.stopPropagation(),this._lastEditedCollection=t,this._modalService.open(l)}openCreateCollectionModal(o){this._collectionFormService.setCollectionGroup(this.collectionGroup.name),this._modalService.open(o)}confirmCollectionDelete(o,t){var l=this;return(0,s.Z)(function*(){o.stopPropagation(),(yield l._modalService.getConfirmation({title:`Delete collection ${t.name}?`,description:"This action will remove the collection and all of the flashcards inside it",confirmation:"This is irreversible. Are you sure?",color:l.collectionGroup.color}))&&(yield l._userIdInterceptorService.deleteCollectionReference(l.collectionGroup.name,t),yield l._collectionRepository.deleteCollection(t.id))})()}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(d.Z),e.Y36(_),e.Y36(g),e.Y36(m.G))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-collection-group"]],viewQuery:function(t,l){if(1&t&&e.Gf(A,5),2&t){let i;e.iGM(i=e.CRH())&&(l.collectionsGrid=i.first)}},inputs:{collectionGroup:"collectionGroup",indexOnScreen:"indexOnScreen"},decls:7,vars:1,consts:[[4,"ngIf"],["collectionForm",""],["editCollectionGroupForm",""],["editCollectionForm",""],[1,"collection-group-header","light-box-shadow","empty-button",3,"click"],[1,"header-text","collection-group-header-text-margin"],["src","./assets/expand_more.svg",1,"arrow-icon",3,"ngClass"],[1,"collection-group-header-controls"],[1,"empty-button"],["src","./assets/edit.svg",1,"hover-icon",3,"click"],["src","./assets/delete.svg",1,"hover-icon",3,"click"],[1,"collection-grid",3,"ngClass"],["collectionsGrid",""],["class","collection-box existing-collection light-box-shadow empty-button slide-from-left-and-scale-enter",3,"animation-delay","class","routerLink",4,"ngFor","ngForOf"],[1,"add-new-collection-box","collection-box","light-box-shadow","empty-button","slide-from-left-and-scale-enter",3,"click"],["src","./assets/add-circle.svg",1,"grayed-icon"],[1,"collection-box","existing-collection","light-box-shadow","empty-button","slide-from-left-and-scale-enter",3,"routerLink"],[1,"collection-group-action-buttons-container"],["src","./assets/edit.svg",1,"grayed-icon-hover",3,"click"],["src","./assets/delete.svg",1,"grayed-icon-hover",3,"click"],[3,"collectionGroup"],[3,"collectionGroup","collectionReference"]],template:function(t,l){1&t&&(e.YNc(0,R,15,12,"ng-container",0),e.YNc(1,q,1,0,"ng-template",null,1,e.W1O),e.YNc(3,Q,1,1,"ng-template",null,2,e.W1O),e.YNc(5,E,1,2,"ng-template",null,3,e.W1O)),2&t&&e.Q6J("ngIf",void 0!==l.collectionGroup)},dependencies:[u.mk,u.sg,u.O5,b.rH,k,P,I],styles:[".collection-group-header-text-margin[_ngcontent-%COMP%]{margin:.2em 0}.arrow-icon[_ngcontent-%COMP%]{transition:.2s}.collection-group-header[_ngcontent-%COMP%]{border:3px hsl(283,81%,52%) solid;border-bottom:unset;border-left:unset;border-radius:10px 15px 15px 10px;padding:.3em 1em;width:100%;display:flex;justify-content:space-between;align-items:center}.collection-group-header.pink[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsl(315,90%,81%) 0%,hsl(313,93%,43%) 30%,hsl(283,81%,52%) 100%)}.collection-group-header.green[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsl(115,66%,69%) 0%,hsl(119,55%,51%) 30%,hsl(283,81%,52%) 100%)}.collection-group-header.blue[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsl(180,55%,62%) 0%,hsl(186,69%,49%) 30%,hsl(283,81%,52%) 100%)}.collection-group-header.yellow[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsl(44,61%,68%) 0%,hsl(54,57%,49%) 30%,hsl(283,81%,52%) 100%)}.collection-group-header-controls[_ngcontent-%COMP%]{display:flex;column-gap:.7rem}.collection-grid[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;column-gap:2%;row-gap:1.2rem;margin:1em 0;transform-origin:top;transition:.4s ease;opacity:1;transform:scaleY(1)}.collection-grid.collection-grid-collapsed[_ngcontent-%COMP%]{transform:scaleY(0%);opacity:0}.collection-box[_ngcontent-%COMP%]{width:15%;height:8rem;border-radius:15px;border:2px hsla(0,0%,70%,.3) solid;transition:.3s;filter:brightness(100%)}.collection-box.pink[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsla(315,90%,81%,.1) 0%,hsla(313,93%,43%,.1) 30%,hsla(283,81%,52%,.5) 100%);border-color:#faa3e4}.collection-box.green[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsla(115,66%,69%,.25) 0%,hsla(119,55%,51%,.25) 30%,hsla(283,81%,52%,.5) 100%);border-color:#84e47c}.collection-box.blue[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsla(180,55%,62%,.25) 0%,hsla(186,69%,49%,.25) 30%,hsla(283,81%,52%,.5) 100%);border-color:#69d3d3}.collection-box.yellow[_ngcontent-%COMP%]{background:linear-gradient(135deg,hsla(44,61%,68%,.25) 0%,hsla(54,57%,49%,.25) 30%,hsla(283,81%,52%,.5) 100%);border-color:#dfc57c}.collection-box[_ngcontent-%COMP%]:hover{filter:brightness(95%)}.collection-box[_ngcontent-%COMP%]:active{filter:brightness(90%)}.existing-collection[_ngcontent-%COMP%]{position:relative;padding:2rem .5rem .5rem;font-size:1.05rem;word-break:break-all;overflow:hidden}.collection-group-action-buttons-container[_ngcontent-%COMP%]{width:calc(100% - .6em);display:flex;justify-content:space-between;position:absolute;top:.3em;right:.3em;left:.3em}.add-new-collection-box[_ngcontent-%COMP%]{background-color:#d9d9d94d;border:3px hsla(0,0%,70%,.3) solid}.add-new-collection-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:40%;max-width:50px}@media (max-width: 600px){.collection-box[_ngcontent-%COMP%]{width:32%;height:6rem}}"]})}return n})();function H(n,c){1&n&&(e._uU(0,"Create "),e._UZ(1,"img",3))}let L=(()=>{class n{constructor(o){this._collectionFormGorupService=o}createCollectionGroup(){var o=this;return(0,s.Z)(function*(){yield o._collectionFormGorupService.createCollectionGroup()})()}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(f))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-create-collection-group-form"]],decls:6,vars:2,consts:[[1,"form-outer-container","light-box-shadow"],[3,"buttonTemplate","buttonCallback"],["button",""],["src","./assets/add-circle.svg",1,"inverted-black-icon"]],template:function(t,l){if(1&t&&(e.TgZ(0,"div",0)(1,"h3"),e._uU(2,"New collection group"),e.qZA(),e._UZ(3,"app-collection-group-form-body",1),e.qZA(),e.YNc(4,H,2,0,"ng-template",null,2,e.W1O)),2&t){const i=e.MAs(5);e.xp6(3),e.Q6J("buttonTemplate",i)("buttonCallback",l.createCollectionGroup)}},dependencies:[x]})}return n})();function j(n,c){if(1&n&&e._UZ(0,"app-collection-group",9),2&n){const o=c.$implicit,t=c.index;e.Udp("animation-delay",.1*t+"s"),e.Q6J("collectionGroup",o)("indexOnScreen",t)}}function $(n,c){if(1&n){const o=e.EpF();e.TgZ(0,"div",3)(1,"div",4),e.YNc(2,j,1,4,"app-collection-group",5),e.TgZ(3,"button",6),e.NdJ("click",function(){e.CHM(o);const l=e.oxw(),i=e.MAs(3);return e.KtG(l.openModal(i))}),e.TgZ(4,"h1",7),e._UZ(5,"img",8),e._uU(6,"New collection group "),e.qZA()()()()}if(2&n){const o=c.ngIf,t=e.oxw();e.xp6(2),e.Q6J("ngForOf",t.sortCollectionGroups(o.collectionGroups)),e.xp6(1),e.Udp("animation-delay",.1*o.collectionGroups.length+"s")}}function D(n,c){1&n&&e._UZ(0,"app-create-collection-group-form")}function K(n,c){1&n&&e._UZ(0,"app-loader")}let W=(()=>{class n{get user$(){return this._authService.user$}constructor(o,t){this._authService=o,this._modalService=t}openModal(o){this._modalService.open(o)}sortCollectionGroups(o){return o.sort((t,l)=>{const i=t.name.toUpperCase(),a=l.name.toUpperCase();return i<a?-1:i>a?1:0})}static#e=this.\u0275fac=function(t){return new(t||n)(e.Y36(v.e),e.Y36(d.Z))};static#o=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-collection-groups"]],decls:6,vars:4,consts:[["class","footer under-navbar-container",4,"ngIf","ngIfElse"],["collectionGroupForm",""],["loader",""],[1,"footer","under-navbar-container"],[1,"collection-groups-container"],["class","slide-from-left-enter",3,"animation-delay","collectionGroup","indexOnScreen",4,"ngFor","ngForOf"],[1,"add-new-collection-group-header","light-box-shadow","empty-button","slide-from-left-enter",3,"click"],[1,"header-text","collection-group-header-text-margin"],["src","./assets/add-circle.svg",1,"grayed-icon"],[1,"slide-from-left-enter",3,"collectionGroup","indexOnScreen"]],template:function(t,l){if(1&t&&(e.YNc(0,$,7,3,"div",0),e.ALo(1,"async"),e.YNc(2,D,1,0,"ng-template",null,1,e.W1O),e.YNc(4,K,1,0,"ng-template",null,2,e.W1O)),2&t){const i=e.MAs(5);e.Q6J("ngIf",e.lcZ(1,2,l.user$))("ngIfElse",i)}},dependencies:[u.sg,u.O5,T.R,B,L,u.Ov],styles:[".collection-group-header-text-margin[_ngcontent-%COMP%]{margin:.2em 0}.collection-groups-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;row-gap:1.5em}.add-new-collection-group-header[_ngcontent-%COMP%]{border:3px hsl(0,0%,75%) solid;background:linear-gradient(135deg,hsl(0,0%,93%) 0%,hsl(0,0%,75%) 100%);border-bottom:unset;border-left:unset;border-radius:10px 15px 15px 10px;padding:.3em 1em;color:#666;margin-bottom:4em;transition:.3s;filter:brightness(100%)}.add-new-collection-group-header[_ngcontent-%COMP%] > h1[_ngcontent-%COMP%]{display:flex;justify-content:flex-start;align-items:center;column-gap:.5em}.add-new-collection-group-header[_ngcontent-%COMP%]:hover{filter:brightness(95%)}.add-new-collection-group-header[_ngcontent-%COMP%]:active{filter:brightness(90%)}@media (max-width: 600px){.collection-groups-container[_ngcontent-%COMP%]{row-gap:1em}}"]})}return n})();var V=p(8524);let X=(()=>{class n{static#e=this.\u0275fac=function(t){return new(t||n)};static#o=this.\u0275mod=e.oAB({type:n});static#t=this.\u0275inj=e.cJS({imports:[u.ez,b.Bz.forChild([{path:"",component:W}]),r.UX,V.m]})}return n})()}}]);