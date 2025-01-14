import ContentForm from '@/components/content-form'

export default function Home() {
  return (
    <section className='py-24 '>
      <div className='container'>
        <h1 className='text-3xl font-bold'>editing blog</h1>

        <ContentForm id={1} initialData={{title: "Idk", slug: "idk"}} actionType='edit' 
        // html='<h1>This is a heading - Wassup fellllaas</h1><p>This is a paragraph </p><p></p><p>List Items</p><ul class="list-disc list-outside leading-3 -mt-2 tight" data-tight="true"><li class="leading-normal -mb-2"><p>List 1</p></li><li class="leading-normal -mb-2"><p>List 2</p></li><li class="leading-normal -mb-2"><p>List 3</p></li></ul><p></p><p>Checkbox</p><ul class="not-prose pl-2 " data-type="taskList"><li class="flex gap-2 items-start my-4" data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>To-do list</p></div></li></ul><p></p><p>Well Idk styles are not working</p>' 
        html='<p>auiii</p><p>undefined</p><p>undefined</p>'
        />
      </div>
    </section>
  )
}