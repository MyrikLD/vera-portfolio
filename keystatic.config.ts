import { config, collection, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'MyrikLD',
      name: 'vera-portfolio',
    },
  },

  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        order: fields.number({ label: 'Order', defaultValue: 0 }),
        cover: fields.image({
          label: 'Cover',
          directory: 'public/images/projects',
          publicPath: '/images/projects',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        gallery: fields.array(
          fields.image({
            label: 'Image',
            directory: 'public/images/projects',
            publicPath: '/images/projects',
          }),
          { label: 'Gallery' }
        ),
        description: fields.text({ label: 'Description', multiline: true }),
      },
    }),
  },

  singletons: {
    profile: singleton({
      label: 'Profile',
      path: 'src/content/profile/index',
      schema: {
        name: fields.text({ label: 'Name' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        email: fields.text({ label: 'Email' }),
        telegram: fields.text({ label: 'Telegram handle' }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
        cv_url: fields.url({ label: 'CV URL (Google Drive)' }),
        skills: fields.array(
          fields.object({
            category: fields.text({ label: 'Category' }),
            items: fields.array(fields.text({ label: 'Item' }), {
              label: 'Items',
              itemLabel: (props) => props.value,
            }),
          }),
          {
            label: 'Skills',
            itemLabel: (props) => props.fields.category.value,
          }
        ),
      },
    }),
  },
});
