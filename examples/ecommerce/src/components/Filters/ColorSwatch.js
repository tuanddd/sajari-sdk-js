/* eslint-disable react/prop-types */

import { Fragment } from 'preact';

import is from '../../utils/is';
import { toKebabCase } from '../../utils/string';
import Label from '../Forms/Label';
import { IconCheck } from '../Icons';
import Header from './Header';

const allowedColors = {
  White: 'bg-white border-gray-300 text-gray-600 outline-shadow',
  Silver: 'bg-gray-300 border-gray-400 text-gray-700',
  Black: 'bg-black border-black text-white',
  Pink: 'bg-pink-400 border-pink-500 text-pink-100',
  Magenta: 'bg-pink-600 border-pink-700 text-pink-100',
  Red: 'bg-red-400 border-red-500 text-red-800',
  Beige: 'bg-orange-200 border-orange-300 text-orange-600',
  Orange: 'bg-orange-400 border-orange-500 text-orange-800',
  Brown: 'bg-orange-700 border-orange-800 text-orange-100',
  Yellow: 'bg-yellow-300 border-yellow-400 text-yellow-600',
  Green: 'bg-green-400 border-green-500 text-green-100',
  Azure: 'bg-teal-100 border-teal-200 text-teal-500',
  Aqua: 'bg-teal-300 border-teal-400 text-teal-700',
  Teal: 'bg-teal-400 border-teal-500 text-teal-100',
  Turquoise: 'bg-teal-500 border-teal-600 text-teal-100',
  Blue: 'bg-blue-400 border-blue-500 text-blue-800',
  'Electric blue': 'bg-blue-600 border-blue-700 text-blue-100',
  Lilac: 'bg-purple-300 border-purple-400 text-purple-700',
  Purple: 'bg-purple-400 border-purple-500 text-purple-800',
  Violet: 'bg-purple-600 border-purple-700 text-purple-100',
};

const sortColors = (raw) =>
  Object.keys(allowedColors).reduce((obj, key) => {
    if (raw[key]) {
      obj[key] = raw[key];
    }
    return obj;
  }, {});

const filterColors = (raw) => {
  const keys = Object.keys(allowedColors);

  return sortColors(
    Object.keys(raw)
      .filter((key) => keys.includes(key))
      .reduce((obj, key) => {
        const count = raw[key];
        const className = allowedColors[key];
        obj[key] = { count, className };
        return obj;
      }, {}),
  );
};

const ColorSwatch = ({ values, items, title, type, onChange, onReset }) => {
  if (!items || !Object.keys(items).length) {
    return null;
  }

  const filtered = filterColors(items);

  if (!Object.keys(filtered).length) {
    return null;
  }

  return (
    <Fragment>
      <Header title={title} filtered={!is.empty(values)} onReset={onReset} />

      <div className="grid grid-cols-7 gap-4 lg:gap-2">
        {Object.entries(filtered).map(([name, { count, className }], index) => {
          const id = `${type}-${toKebabCase(name)}-${index}`;
          const checked = values.includes(name);

          return (
            <Label
              htmlFor={id}
              className={`flex items-center justify-center mb-1 rounded w-full h-10 border shadow-sm cursor-pointer lg:w-6 lg:h-6 lg:rounded-full focus-within:shadow-outline ${className}`}
            >
              <span className="sr-only">{`${name} (${count} items)`}</span>
              <input
                type="checkbox"
                id={id}
                key={id}
                className="sr-only"
                value={name}
                checked={checked}
                onChange={onChange}
              />
              <IconCheck
                className={`mt-px fill-current transition-opacity duration-100 ${checked ? 'opacity-1' : 'opacity-0'}`}
              />
            </Label>
          );
        })}
      </div>
    </Fragment>
  );
};

export default ColorSwatch;
