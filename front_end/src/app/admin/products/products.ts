import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../services/products/product';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit{

  showAdd: boolean = false;
  productsOjt: any = {
    id: 0,
    nom: "",
    description: "",
    prix: 0,
    stock: 0,
    id_categorie: 0,
    imageUrl: "",
  };

  categoryList: any [] = [];
  productList: any [] = [];
  selectedFile: File | null = null;
  productForm: FormGroup;

  constructor(private productSvc: Product, private fb: FormBuilder){
    this.productForm = fb.group({
      nom: ['', [Validators.required]],
      description: ['', [Validators.required]],
      prix: ['', [Validators.required, ]],
      stock: ['', [Validators.required, ]],
      id_categorie: ['', [Validators.required, ]],
      image: ['', [Validators.required, ]],

    });
  }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  showPanel(){
    this.showAdd = true;
  }
  closePanel(){
    this.showAdd = false;
    this.clear();
  }
  getAllCategories(){
    this.productSvc.getAllCategories().subscribe((res:any)=>{
      this.categoryList = res;
    });
  }

  getAllProducts(){
    this.productSvc.getAllProducts().subscribe((res: any) => {
      this.productList = res;
    })
  }

  onUpdate(){
    debugger;
    const formData = new FormData();
    formData.append('id', this.productsOjt.id);
    formData.append('nom', this.productForm.value.nom);
    formData.append('description', this.productForm.value.description);
    formData.append('stock', this.productForm.value.stock);
    formData.append('prix', this.productForm.value.prix);
    if(this.selectedFile){
      formData.append('image_url', this.selectedFile);
    }
    formData.append('id_categorie', this.productForm.value.id_categorie);

    this.productSvc.updateproduct(formData).subscribe((res: any) => {
      //debugger;
      if(res){
        alert("Produit modifie");
        this.getAllProducts();
        this.clear();
      }else{
        alert(res.message)
      }
    })
  }

  onSave(){
    if(this.productForm.valid){
       //console.log(this.productForm)
      if (!this.selectedFile) {
        alert("Veuillez choisir une image.");
        return;
      }

        const formData = new FormData();
        formData.append('nom', this.productForm.value.nom);
        formData.append('description', this.productForm.value.description);
        formData.append('stock', this.productForm.value.stock);
        formData.append('prix', this.productForm.value.prix);
        formData.append('image_url', this.selectedFile);
        formData.append('id_categorie', this.productForm.value.id_categorie);

        this.productSvc.saveProduct(formData).subscribe({
          next: res => {
          
          alert("Produit cree");
          this.getAllProducts();
          this.productForm.reset();
          this.productForm.get('image')?.setValue(null);
          this.selectedFile = null;
        
          },
          error: err => {
          console.error("Erreur API :", err);
          alert("Erreur lors de l'envoi. "+ err.error.message);
        }
      });

    }else{
      this.productForm.markAllAsTouched();
    }
   
  }

  onDelete(product: any){
    const verif = confirm("Voulez vous vraiment supprime ce produit ?");
    if(verif){
      this.productSvc.deleteProduct(product.id).subscribe((res: any) => {
        
          alert("Produit Supprime !");
          this.getAllProducts();
        
    });
    }
    
  }

  onEdit(item: any){
    this.productsOjt = item;
    this.productForm.get('nom')?.setValue(item.nom);
    this.productForm.get('description')?.setValue(item.description);
    this.productForm.get('prix')?.setValue(item.prix);
    this.productForm.get('stock')?.setValue(item.stock);
    this.productForm.get('id_categorie')?.setValue(item.id_categorie);
    this.showPanel();
  }

  clear(){
    this.productsOjt = {
      id: 0,
      nom: "",
      description: "",
      prix: 0,
      stock: 0,
      id_cat: 0,
      image_url: "",
    };
    this.productForm.get('image')?.setValue(null);
    this.productForm.reset()
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
    } else {
      alert("Seules les images sont autorisées !");

    }
  }

}
