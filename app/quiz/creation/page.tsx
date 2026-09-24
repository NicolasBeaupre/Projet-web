import Form from '@/app/ui/quiz/creer-form';
import Breadcrumbs from '@/app/ui/quiz/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import  QuizForm from '@/app/ui/quiz/creer-form';
import  QuestionsForm from '@/app/ui/quiz/creer-questions';
import { CreerQuestionBtn,SupprimerQuizBtn } from '@/app/ui/quiz/buttons';
export default async function Page() {
//   const customers = await fetchCustomers();

  return (
    <main>
      <h1>Crée ton quiz!</h1>
      <div id='form-quiz'>
        <QuizForm />
      </div>
      <div>
        <CreerQuestionBtn/>
        <SupprimerQuizBtn/>
      </div>

    </main>
  );
}


