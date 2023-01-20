import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/cards/types/card.model';
import { IFormValidationMessage } from 'src/app/types/form-validation.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/app-state.interface';
import { isLoadingSelector } from 'src/app/cards/store/selectors';

const REQUIRED = 'Ce champ est obligatoire';
const MIN_LENGTH = 'Ce champ doit avoir au moins 3 caractères'
const MAX_LENGTH = 'Ce champ doit avoir moins ou égal à 50 caractères'
const REQUIRED_AR = 'هذه الخانة إجبارية';
const PATTERN_AR = 'مسموح بالحروف العربية فقط'

const ARABIC_REGEX = /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]{3,50}$/

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  cardForm!: FormGroup

  @Input() card: Card | null = null
  @Input() save(data: Card): void {}

  isLoading: boolean = false;

  cardFormErrors: ICardFormErrors = {
    nom: '',
    nomAr: '',
    prenom: '',
    prenomAr: '',
    cin: '',
    profession: '',
    dateNaissance: '',
    type: '',
    image: '',
  }

  validationMessages: ICardValidationMessages = {
    nom: {
      required: REQUIRED,
      minlength: MIN_LENGTH,
      maxlength: MAX_LENGTH
    },
    nomAr: {
      required: REQUIRED_AR,
      pattern: PATTERN_AR
    },
    prenom: {
      required: REQUIRED,
      minlength: MIN_LENGTH,
      maxlength: MAX_LENGTH
    },
    prenomAr: {
      required: REQUIRED_AR,
      pattern: PATTERN_AR
    },
    cin: {
      required: REQUIRED,
      pattern: 'CIN est invalid'
    },
    dateNaissance: {
      required: REQUIRED
    },
    image: {
      required: REQUIRED,
      pattern: 'URL est invalid'
    },
    profession: {
      required: REQUIRED,
      minlength: MIN_LENGTH,
      maxlength: MAX_LENGTH
    },
    type: {
      required: REQUIRED
    },
  }

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.buildForm()

    this.store.select(isLoadingSelector)
      .subscribe(isLoading => this.isLoading = isLoading)

    this.cardForm.valueChanges.subscribe(() => this.onValueChanged());

    this.onValueChanged(); // reset validation messages
  }

  buildForm(): void {
    this.cardForm = this.fb.group({
      nom: [this.card?.nom, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nomAr: [this.card?.nomAr, [Validators.required, Validators.pattern(ARABIC_REGEX)]],
      prenom: [this.card?.prenom, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      prenomAr: [this.card?.prenomAr, [Validators.required, Validators.pattern(ARABIC_REGEX)]],
      cin: [this.card?.cin, [Validators.required, Validators.pattern(/^[A-Z]{1,2}\d{5,6}$/)]],
      profession: [this.card?.profession, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dateNaissance: [this.formattedDate, [Validators.required]],
      type: [this.card?.type, [Validators.required]],
      image: [this.card?.image, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]  
    })
  }

  onSubmit(): void {
    if (this.cardForm.invalid) { return }
    let data: Card = {
      nom: this.cardForm.value.nom,
      nomAr: this.cardForm.value.nomAr,
      prenom: this.cardForm.value.prenom,
      prenomAr: this.cardForm.value.prenomAr,
      cin: this.cardForm.value.cin,
      profession: this.cardForm.value.profession,
      dateNaissance: this.cardForm.value.dateNaissance,
      type: this.cardForm.value.type,
      image: this.cardForm.value.image,
    } 
    this.save(data)
  }

  onValueChanged() {
    if (!this.cardForm) { return; }
    const form = this.cardForm;
  
    for (const field in this.cardFormErrors) {
      if (this.cardFormErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.cardFormErrors[field as keyof ICardFormErrors] = '';
        const control = form.get(field);
  
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field as keyof ICardValidationMessages];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.cardFormErrors[field as keyof ICardFormErrors] += messages[key as keyof IFormValidationMessage] + ' ';
            }
          }
        }
      }
    }
  }

  get maxDate() : string {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 18)
    return date.toISOString().split('T')[0]
  }

  get formattedDate(): string {
    if (this.card?.dateNaissance) {
      const date = new Date(this.card.dateNaissance)
      let month: any = date.getMonth() + 1
      month = month >= 10 ? month : '0'+ month
      let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
      return date.getFullYear() + '-' + month + '-' + day
    }
    return ''
  }

}

interface ICardFormErrors {
  nom: string;
  nomAr: string;
  prenom: string;
  prenomAr: string;
  cin: string;
  profession: string;
  dateNaissance: string;
  type: string;
  image: string;
}

interface ICardValidationMessages {
  nom: IFormValidationMessage;
  nomAr: IFormValidationMessage;
  prenom: IFormValidationMessage;
  prenomAr: IFormValidationMessage;
  cin: IFormValidationMessage;
  profession: IFormValidationMessage;
  dateNaissance: IFormValidationMessage;
  type: IFormValidationMessage;
  image: IFormValidationMessage;
}
