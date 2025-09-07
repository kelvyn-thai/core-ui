import React from 'react';

interface StoryCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  variant?: 'default' | 'showcase' | 'interactive';
}

export const StoryCard: React.FC<StoryCardProps> = ({ title, description, children, variant = 'default' }) => {
  const cardStyles = {
    default:
      'bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-300',
    showcase:
      'bg-gradient-to-br from-slate-50/90 via-white/80 to-blue-50/40 border border-gray-200/40 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500',
    interactive:
      'bg-white/90 border border-blue-200/50 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-300/60 transition-all duration-300 hover:-translate-y-1',
  };

  return (
    <div className={`${cardStyles[variant]} mb-8 p-8`}>
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-600"></div>
          <h3 className="text-xl font-bold tracking-tight text-gray-900">{title}</h3>
        </div>
        {description && <p className="ml-4 text-sm leading-relaxed text-gray-600">{description}</p>}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
};

interface StoryGridProps {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const StoryGrid: React.FC<StoryGridProps> = ({ columns = 3, gap = 'md', children }) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapSize = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return <div className={`grid ${gridCols[columns]} ${gapSize[gap]} items-start`}>{children}</div>;
};

interface StoryShowcaseProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const StoryShowcase: React.FC<StoryShowcaseProps> = ({ title, subtitle, children }) => {
  return (
    <div className="relative mx-auto min-h-screen max-w-7xl overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-8">
      <div className="absolute inset-0 opacity-40">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative z-10">
        <div className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-75 blur"></div>
              <div className="relative rounded-lg bg-white px-4 py-2">
                <span className="text-sm font-semibold text-gray-700">Component Library</span>
              </div>
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg leading-relaxed font-medium text-gray-600">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

interface ComponentPreviewProps {
  name: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
  background?: 'white' | 'gray' | 'dark';
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  name,
  description,
  children,
  background = 'white',
}) => {
  const backgrounds = {
    white: 'bg-white/90 backdrop-blur-sm',
    gray: 'bg-gray-50/90 backdrop-blur-sm',
    dark: 'bg-gray-900/95 backdrop-blur-sm',
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-200/60 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="border-b border-gray-200/60 bg-gradient-to-r from-gray-50/90 to-slate-50/90 px-5 py-4 backdrop-blur-sm">
        <div className="mb-1 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400 transition-colors group-hover:bg-green-500"></div>
          <h4 className="text-sm font-semibold tracking-wide text-gray-900">{name}</h4>
        </div>
        {description && <p className="text-xs leading-relaxed text-gray-600">{description}</p>}
      </div>
      <div
        className={`${backgrounds[background]} relative flex min-h-[140px] items-center justify-center p-8 transition-transform duration-300 group-hover:scale-[1.02]`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/10 to-purple-50/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

interface PropertyTableProps {
  properties: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h4 className="font-medium text-gray-900">Props</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Default</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {properties.map((prop, index) => (
              <tr key={index}>
                <td className="px-4 py-3 font-mono text-sm text-gray-900">{prop.name}</td>
                <td className="px-4 py-3 font-mono text-sm text-blue-600">{prop.type}</td>
                <td className="px-4 py-3 font-mono text-sm text-gray-500">{prop.default || '—'}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Divider: React.FC = () => <div className="my-8 border-t border-gray-200" />;

interface StatusBadgeProps {
  status: 'stable' | 'beta' | 'deprecated' | 'new';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    stable: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200/50 shadow-sm',
    beta: 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200/50 shadow-sm',
    deprecated: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200/50 shadow-sm',
    new: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200/50 shadow-sm',
  };

  const icons = {
    stable: '✓',
    beta: '⚡',
    deprecated: '⚠',
    new: '✨',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm ${styles[status]} transition-transform duration-200 hover:scale-105`}
    >
      <span className="text-[10px]">{icons[status]}</span>
      {status.toUpperCase()}
    </span>
  );
};
