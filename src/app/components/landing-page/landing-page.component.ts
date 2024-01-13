import { AfterViewInit, Component } from '@angular/core';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit {
    public landingPageComponents: { title: string; description: string; additional?: string[] }[];

    constructor() {
        this.landingPageComponents = [
            {
                title: 'One place for all your flashcards 🗃️',
                description:
                    'TwinkleCards✨ is an app from a flashcard lover for other flashcard lovers. The goal is to make the process of studying with flashcard easier and more convenient',
                additional: ['Create your own collections', 'Add your own flashcards', 'Manage them with ease']
            },
            {
                title: 'Study and memorize easier 💡',
                description:
                    'TwinkleCards✨ is here to make your learning process easier. No more searching through hundreds of your flashcards to find that one word that you have on the tip of your tongue...',
                additional: ['Search for words', 'Sort your collection', 'View and flip flashcards']
            },
            {
                title: 'Share with your friends 🤝',
                description:
                    'If you do not want to create your own collections maybe there is an already existing collection that might catch your eye. With TwinkleCards✨, you decide if you wish to share your flashcards with others',
                additional: ['Browse collections of others', 'Make collections public', '...or keep them hidden']
            }
        ];
    }

    ngAfterViewInit(): void {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('intersection-detected');
                } else {
                    entry.target.classList.remove('intersection-detected');
                }
            });
        });

        const obsrvedIntersectionElements = document.querySelectorAll('.observe-intersection');
        obsrvedIntersectionElements.forEach((el) => intersectionObserver.observe(el));
    }
}

