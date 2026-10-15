'use client'
import {
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Select from 'react-select';
import ajouterQuiz from '@/app/lib/action';

type Quiz = {
  nomQuiz: string,
  imageURL: string,
  categorie: string,
  questions: [
    { titre: string, reponse1: string, reponse2: string, reponse3: string, reponse4: string, bonneReponse: string }
  ]
}
const categoriesQuiz = [
  {label:"Science", value:"science"},
  {label:"Culture", value:"culture"},
  {label:"Jeux vidéo", value:"jeux"},
{label:"Histoire", value:"histoire"},
{label:"Mathématiques", value:"mathematiques"},
{label:"Musique", value:"musique"},
{label:"Sport", value:"sport"},
{label:"Littérature", value:"litterature"},
{label:"Animaux", value:"animaux"},
{label:"Autre...", value:"autre"}, ]

export default function QuizForm() {

  const { control, register, handleSubmit, formState: { errors } } = useForm<Quiz>({
    defaultValues: {
      nomQuiz: '',
      imageURL: '',
      categorie: '',
      questions: [
        { titre: '', reponse1: '', reponse2: '', reponse3: '', reponse4: '', bonneReponse: 'reponse1' }
      ]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  })
  const onSubmit = async (data: any) => {
    await ajouterQuiz(data);
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='m-5'>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <h2 className='text-black text-2xl'>Quiz</h2>
          <div className='border border-gray-300 border-8 rounded p-5 mb-5 mt-3'>
            <div className="mb-4">
              <label className="mb-2 block text-lg font-medium text-black">
                Choisir le nom du quiz
              </label>
              <input
                {...register("nomQuiz", { required: "Le nom du quiz ne peut pas être vide" })}
                placeholder="Quiztro..."
                className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-gray-200 focus:outline-black text-black
              placeholder:text-gray-500 ${errors.nomQuiz ? "border-red-500 focus:outline-red-500" : "border-gray-200 focus:outline-black"}`}
              />
              {errors.nomQuiz && (
                <p className='text-red-500 text-sm'>{errors.nomQuiz.message}</p>
              )}

            </div>
            <div className="mb-4">
              <label className="mb-2 block text-lg font-medium text-black">
                URL de l'image désiré
              </label>
              <input
                {...register("imageURL")}
                placeholder="https://placehold.co/600x400/png..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-gray-200 focus:outline-black text-black
              placeholder:text-gray-500"
              />

            </div>
            <div className="mb-4">
              <label className="mb-2 block text-lg font-medium text-black">
                Choisir la catégorie du quiz
              </label>
              <Controller
                control={control}
                name="categorie"
                rules={{ required: true }}
                render={({field}) =>(
                    <Select
                    instanceId={"quiz"}
                      options={categoriesQuiz}
                      menuPlacement="auto"
                      placeholder="Sélectionnez une catégorie ..."
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: state.isFocused ? 'grey' : 'black',
                          color: 'black'
                        }),
                        option: (baseStyles) => ({
                          ...baseStyles,
                          color: 'black'
                        }),
                      }}
                      isSearchable={false}

                      value={categoriesQuiz.find((option) => option.value == field.value)}

                      onChange={(optionSelectionne) =>{field.onChange(optionSelectionne ? optionSelectionne.value : "")}}

                      name={field.name}

                    />
                )
                }
              />


            </div>
          </div>

          <h2 className='text-black text-2xl'>Questions</h2>


          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 border border-gray-300 border-8 rounded p-5 mb-5 mt-3">
              <div className='flex justify-between items-center'>
                <span className='font-medium text-xl text-black'>Question {index + 1}</span>
                {fields.length > 1 && (
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='text-red-500 text-sm'>
                    <span className="sr-only">Supprimer</span>
                    <TrashIcon className="w-7" />
                  </button>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-black">
                  Titre de la question
                </label>
                <input
                  {...register(`questions.${index}.titre` as any, { required: "Le titre de la question ne peut pas être vide" })}
                  placeholder="Qu'elle est la couleur du soleil..."
                  className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-gray-200 focus:outline-black text-black
                  placeholder:text-gray-500 ${errors.questions?.[index]?.titre ? "border-red-500 focus:outline-red-500" : "border-gray-200 focus:outline-black"}`}
                />
                {errors.questions?.[index]?.titre && (
                  <p className='text-red-500 text-sm'>{errors.questions?.[index]?.titre.message}</p>
                )}
              </div>
              <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                <h3 className='text-black'>Réponses</h3>
                <div className='grid grid-cols-2'>
                  {[1, 2, 3, 4].map((numReponse) => (
                    <div key={numReponse} className='flex items-center flex-wrap gap-5 m-5 border border-gray-300 border-8 rounded p-3'>
                      <div className='flex text-black'>
                        <input type='radio' value={`reponse${numReponse}`} defaultChecked={numReponse == 1}
                          {...register(`questions.${index}.BonneReponse` as any, { required: true })} className='w-5 h-5' />
                      </div>
                      <div className='w-full'>
                        <input {...register(`questions.${index}.reponse${numReponse}` as any, { required: "Le champ de réponse ne peut pas être vide" })} placeholder={`Réponse ${numReponse}...`}
                          className={`peer block w-full h-50 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-gray-200 focus:outline-black text-black
                  placeholder:text-gray-500 ${(errors.questions?.[index] as any)?.[`reponse${numReponse}`] ? "border-red-500 focus:outline-red-500" : "border-gray-200 focus:outline-black"}`}
                        />
                        {(errors.questions?.[index] as any)?.[`reponse${numReponse}`] && (
                          <p className='text-red-500 text-sm'>{(errors.questions?.[index] as any)?.[`reponse${numReponse}`].message}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ))}

          <div className='flex gap-4'>
            <button type='button' onClick={() => append({ titre: '', reponse1: '', reponse2: '', reponse3: '', reponse4: '', bonneReponse: 'reponse1' })}
              className="rounded-md border p-2 hover:bg-gray-100 text-black bg-green-300">
              <span className="sr-only text-black">Ajouter une question</span>
              <PlusIcon className="w-5 text-black" />
            </button>
            <button type='submit'
              className="rounded-md border p-2 hover:bg-gray-100 text-black">Terminer la création</button>
          </div>
        </div>

      </form>
    </div>
  );
}
