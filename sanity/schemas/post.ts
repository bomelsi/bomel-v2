import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Artículo de Blog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 90 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Ventanería", value: "Ventanería" },
          { title: "Construcción", value: "Construcción" },
          { title: "Fachadas", value: "Fachadas" },
          { title: "Acabados", value: "Acabados" },
          { title: "Consejos", value: "Consejos" },
          { title: "Casos de éxito", value: "Casos de éxito" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extracto (máx. 200 caracteres)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Contenido",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Pie de foto",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "Título SEO (opcional, max 60 chars)",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta descripción SEO (opcional, max 160 chars)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "mainImage",
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Más reciente primero",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
