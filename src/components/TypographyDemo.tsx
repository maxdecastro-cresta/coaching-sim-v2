import React from 'react';

const TypographyDemo = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="title-page-text">Typography System</h1>

      <section>
        <h2 className="title-section-text mb-4">Element Styles</h2>
        <div className="space-y-2">
          <p className="element-small-text">Element Small - 12px, standard line height, semibold (550)</p>
          <p className="element-regular-text">Element Regular - 14px, standard line height, semibold (550)</p>
          <p className="element-large-text">Element Large - 16px, standard line height, semibold (550)</p>
        </div>
      </section>

      <section>
        <h2 className="title-section-text mb-4">Body Styles</h2>
        <div className="space-y-2">
          <p className="body-caption-text">Body Caption - 11px, standard line height, semibold (550)</p>
          <p className="body-small-text">Body Small - 12px, standard line height, semibold (550)</p>
          <p className="body-regular-text">Body Regular - 14px, standard line height, base weight (450)</p>
        </div>
      </section>

      <section>
        <h2 className="title-section-text mb-4">Title Styles</h2>
        <div className="space-y-2">
          <p className="title-small-text">Title Small - 12px, standard line height, bold (650)</p>
          <p className="title-regular-text">Title Regular - 14px, standard line height, bold (650)</p>
          <p className="title-large-text">Title Large - 16px, standard line height, bold (650)</p>
          <p className="title-section-text">Title Section - 18px, reduced line height, bold (650)</p>
          <p className="title-page-text">Title Page - 24px, reduced line height, bold (650)</p>
        </div>
      </section>

      <section>
        <h2 className="title-section-text mb-4">CSS Class Alternatives</h2>
        <div className="space-y-2">
          <p className="element-small">Element Small (CSS class)</p>
          <p className="element-regular">Element Regular (CSS class)</p>
          <p className="element-large">Element Large (CSS class)</p>
          <p className="body-caption">Body Caption (CSS class)</p>
          <p className="body-small">Body Small (CSS class)</p>
          <p className="body-regular">Body Regular (CSS class)</p>
          <p className="title-small">Title Small (CSS class)</p>
          <p className="title-regular">Title Regular (CSS class)</p>
          <p className="title-large">Title Large (CSS class)</p>
          <p className="title-section">Title Section (CSS class)</p>
          <p className="title-page">Title Page (CSS class)</p>
        </div>
      </section>

      <section>
        <h2 className="title-section-text mb-4">Utility Class Usage</h2>
        <div className="space-y-2">
          <p className="text-small leading-standard font-semibold">Element Small (utility classes)</p>
          <p className="text-base leading-standard font-semibold">Element Regular (utility classes)</p>
          <p className="text-large leading-standard font-semibold">Element Large (utility classes)</p>
          <p className="text-caption leading-standard font-semibold">Body Caption (utility classes)</p>
          <p className="text-small leading-standard font-semibold">Body Small (utility classes)</p>
          <p className="text-base leading-standard font-base">Body Regular (utility classes)</p>
          <p className="text-small leading-standard font-bold">Title Small (utility classes)</p>
          <p className="text-base leading-standard font-bold">Title Regular (utility classes)</p>
          <p className="text-large leading-standard font-bold">Title Large (utility classes)</p>
          <p className="text-title-section leading-reduced font-bold">Title Section (utility classes)</p>
          <p className="text-title-page leading-reduced font-bold">Title Page (utility classes)</p>
        </div>
      </section>
    </div>
  );
};

export default TypographyDemo; 