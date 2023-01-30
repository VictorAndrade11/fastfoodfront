import Ingredients from "./Ingredients"

const Extras = () => {
  return (
    <div className="w-full mt-6 sm:block min-[639px]:block ">
      <h3 className="text-sm font-bold sm:text-base">
        Adicionais
      </h3>
      <p className="mb-4">Selecione os ingredientes que você quer adicionar a mais no seu lanche</p>
      <div className="flex flex-col gap-8">
        <Ingredients />
        <Ingredients />
        <Ingredients />
      </div>
    </div>
  )
}

export default Extras