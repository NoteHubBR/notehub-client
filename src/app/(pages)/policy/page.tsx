import { policies } from './policies';
import { Template } from '@/components/templates';

const Page = () => (
    <Template.Legal title='Política de Privacidade'>
        <p className='font-light text-sm dark:text-semilight text-semidark'>
            Última atualização:<time dateTime="2026-07-30" className='ml-1'>30/07/2026</time>
        </p>
        {policies.map((policy, key) => (
            <section
                key={key}
                className='flex flex-col gap-3'
            >
                <h2
                    className='w-fit border-b dark:border-light/50 border-dark/50 font-semibold text-xl dark:text-lighter text-darker'
                >
                    {policy.title}
                </h2>
                <p
                    className='font-normal text-base dark:text-semilight text-semidark'
                >
                    {policy.description}
                </p>
            </section>
        ))}
    </Template.Legal>
)

export default Page;