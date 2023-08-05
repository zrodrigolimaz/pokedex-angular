import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

	private setAllPokemons: any;
	public getAllPokemons: any;
	public apiError: boolean = false;
	public errorMessage: string = '';
	public commentForm: FormGroup;

	serviceSubscription = new Subscription
	constructor(
		private pokeapiService: PokeapiService,
		public favoritesService: FavoritesService, // tornando público para usar no template
		private router: Router,  // injetar o Router aqui
		private fb: FormBuilder,
		private formBuilder: FormBuilder
	) {
		this.commentForm = this.fb.group({
			newComment: ['']
		});
	}

	commentForms: Map<number, FormGroup> = new Map<number, FormGroup>();

	ngOnInit(): void {
		this.commentForm = new FormGroup({
			newComment: new FormControl('', Validators.required)
		});

		this.serviceSubscription = this.pokeapiService.apiListAllPokemons.subscribe({
			next: res => {
				this.setAllPokemons = res.results;
				this.getAllPokemons = this.setAllPokemons.map((pokemon: any) => {
					let storedComments = localStorage.getItem(pokemon.name);
					pokemon.comments = storedComments ? JSON.parse(storedComments) : [];
					return pokemon;
				});
			},
			error: error => {
				this.apiError = true;
				this.errorMessage = error.message;
			}
		});
	}

	ngOnDestroy(): void {
		this.serviceSubscription.unsubscribe();
	}

	public getSearch(value: string) {
		const filter = this.setAllPokemons.filter((res: any) => {
			return !res.name.indexOf(value.toLowerCase());
		})
		this.getAllPokemons = filter;
	}

	navigateToDetails(event: Event, id: number) {
		event.stopPropagation();
		this.router.navigate(['details', id]);
	}

	addComment(pokemon: any) {
		const commentForm = this.getCommentForm(pokemon.details.id);
		if (commentForm.valid) {
			let comment = commentForm.value.newComment;
			let storedComments = JSON.parse(localStorage.getItem(pokemon.name) || '[]');
			storedComments.push(comment);
			localStorage.setItem(pokemon.name, JSON.stringify(storedComments));
			pokemon.comments = storedComments;
			commentForm.reset();
		}
	}


	deleteComment(pokemon: any, commentIndex: number) {
		let storedComments = JSON.parse(localStorage.getItem(pokemon.name) || '[]');
		storedComments.splice(commentIndex, 1);
		localStorage.setItem(pokemon.name, JSON.stringify(storedComments));
		pokemon.comments = storedComments;
	}

	getCommentForm(id: number): FormGroup {
		let commentForm = this.commentForms.get(id);
		if (!commentForm) {
			commentForm = this.formBuilder.group({
				newComment: ['', Validators.required]
			});
			this.commentForms.set(id, commentForm);
		}
		return commentForm;
	}
}