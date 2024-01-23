export enum Stocked{
     Stocked = 0, 
     NonStocked = 1
}

export const StockedMapping: Record<Stocked, string> = {
     [Stocked.Stocked]: "Stocked",
     [Stocked.NonStocked]: "Non Stocked"
 };