import { useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/create-channel')({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      name: '',
      type: '',
      token: '',
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <p>
        <input type="text" name="name" placeholder="Name" />
      </p>
      <p>
        <input type="text" name="type" placeholder="Type" />
      </p>
      <p>
        <input type="text" name="token" placeholder="Token" />
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  );
}
