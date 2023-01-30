

export function OrderPrice({order, className}){
    return order ? 


        // Renderização condicional, se tiver order, renderize a div
        (<div className={`w-full flex flex-col items-center justify-center sm:w-full`}>
          <div className='px-8 py-6 mb-6 rounded-md border-black-50 border-[1px] sm:w-full'>
            <ul className='mb-16'>
              <li className='flex justify-between '>
                <h4 className='text-lg font-normal'>1x Smash da casa</h4>
                <small className='text-lg font-semibold'>R$30,50</small>
              </li>
            </ul>
            <div className='py-4 border-t-[1px] border-dashed border-black-100'>
              <h5 className='font-semibold'>Total do pedido:</h5>
              <span className='text-2xl font-bold sm:text-3xl'>R$30,50</span>
            </div>
          </div>
          <div className='flex w-full justify-end items-center gap-6'>
            <button className="p-2 font-bold text-green-900 rounded-2xl border-[1px] border-green-900 sm:w-36 lg:w-48">Continuar adicionando</button>
            <button className="p-2 font-bold text-white-100 bg-green-900 rounded-2xl border-[1px] border-green-900 sm:w-36 lg:w-48">Fazer pedido</button>
           
          </div>
        </div> )
        : console.log('não tem order')
}