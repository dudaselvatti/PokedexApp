# Proposta de Refatoração da Arquitetura (PokedexApp)

## Padrão Escolhido: MVVM (Model-View-ViewModel)

**Justificativa:** 
O padrão MVVM foi escolhido pois se integra de forma extremamente natural e idiomática ao ecossistema moderno do React Native e TypeScript. No React, a separação entre UI e lógica pode ser feita de maneira limpa utilizando *Custom Hooks*. Nesse cenário, o Custom Hook atua perfeitamente como o **ViewModel**, gerenciando o estado e as regras de negócio, enquanto o componente funcional atua estritamente como a **View**, responsável apenas pela renderização visual. Isso facilita a testabilidade, reduz o acoplamento e mantém os componentes de tela muito mais limpos e focados na interface.

---

## Nova Estrutura de Arquivos

Para implementar o MVVM na tela principal da Pokédex, a estrutura de diretórios seria organizada da seguinte forma, isolando as responsabilidades:
```text
PokedexApp/
├─ src/
│  ├─ screens/
│  │  └─ Pokedex/
│  │     ├─ PokedexScreen.tsx          (View)
│  │     ├─ usePokedexViewModel.ts     (ViewModel)
│  │     └─ index.ts                   (Exportador facilitador)
│  │
│  ├─ models/
│  │  └─ Pokemon.ts                    (Definições de Tipos/Interfaces)
│  │
│  └─ services/
│     └─ api.ts                        (Model / Comunicação Externa)