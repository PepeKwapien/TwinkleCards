import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit {
    public landingPageComponents: { title: string; description: string; additional?: string[] }[];

    constructor(private _authService: AuthService, private _languageService: LanguageService) {
        this.landingPageComponents = this._languageService.languageResouce.landingPageComponents;
    }

    ngAfterViewInit(): void {
        // for delayed animations, otherwise the content never loads because calsses are not applied
        this._authService.registerOnAuthStateChanged(() => {
            setTimeout(() => {
                const intersectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('intersection-detected');
                        }
                        // else {
                        //     entry.target.classList.remove('intersection-detected');
                        // }
                    });
                });

                const obsrvedIntersectionElements = document.querySelectorAll('.observe-intersection');
                obsrvedIntersectionElements.forEach((el) => intersectionObserver.observe(el));
            });
        });
    }
}

