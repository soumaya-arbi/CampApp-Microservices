export interface Equipement {
   // id: number;
    idEquipement: number;
    nom: string;
    prix: number;
  description: string;
  centreId: number; // Assurez-vous que cette propriété est présente si vous avez besoin de l'ID du centre
}
