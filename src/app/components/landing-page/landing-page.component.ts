import { AfterViewInit, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit {
    public landingPageComponents: { title: string; description: string; additional?: string[] }[];

    constructor(private _authService: AuthService) {
        this.landingPageComponents = [
            {
                title: 'One place for all your flashcards 🗃️',
                description:
                    'TwinkleCards✨ is an app from a flashcard lover for other flashcard lovers. The goal is to make the process of studying with flashcard easier and more convenient',
                additional: ['Create your flashcards 👏', 'Manage them with ease 🙌', 'Have fun while studying 🥳']
            },
            {
                title: 'Study and memorize easier 💡',
                description:
                    'TwinkleCards✨ is here to make your learning process easier. No more searching through hundreds of your flashcards to find that one word that you have on the tip of your tongue...',
                additional: ['Search for words 🔍', 'Sort your collections 🗂️', 'View and flip flashcards 🍳']
            },
            {
                title: 'Share with your friends 🤝',
                description:
                    'Maybe there is that one special friend that will share their collections with you. You can share your TwinkleCards✨ collection by copying the link. Authentication is not required',
                // additional: ['Browse collections of others 🧐', 'Make collections public 📡', '...or keep them hidden 🙈'],
                additional: ['Browse collections of friends 🧐', 'Share your collections 📡', '...or keep them hidden 🙈']
            }
        ];
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

