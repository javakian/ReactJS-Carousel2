import React, { MouseEventHandler } from 'react';

import * as Utils from '../utils';
import { State } from '../types';

export const DotsNavigation = ({ state, onClick, onMouseEnter, onMouseLeave }: Props) => {
	const { itemsCount, itemsInSlide, infinite, autoWidth, activeIndex } = state;
	const { isNextSlideDisabled } = Utils.getSlideItemInfo(state);
	const dotsLength = Utils.getDotsNavigationLength(itemsCount, itemsInSlide, autoWidth);

	return (
		<ul className="alice-carousel__dots">
			{Array.from({ length: itemsCount }).map((item, i) => {
				if (i < dotsLength) {
					// TODO check, refactoring

					const isTheLastDotIndex = Utils.checkIsTheLastDotIndex(i, Boolean(infinite), dotsLength);
					let nextIndex = Utils.getItemIndexForDotNavigation(i, isTheLastDotIndex, itemsCount, itemsInSlide);
					let currentIndex = Utils.getActiveSlideIndex(isNextSlideDisabled, state);

					if (autoWidth) {
						currentIndex = activeIndex;

						if (activeIndex < 0) {
							currentIndex = itemsCount - 1;
						} else if (activeIndex >= itemsCount) {
							currentIndex = 0;
						}
						nextIndex = i;
					}

					const className = currentIndex === i ? ' __active' : '';

					return (
						<li
							key={`dot-item-${i}`}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							onClick={() => onClick(nextIndex)}
							className={`alice-carousel__dots-item${className}`}
						/>
					);
				}
			})}
		</ul>
	);
};

type Props = {
	state: State;
	onClick: (index: number) => void;
	onMouseEnter?: MouseEventHandler;
	onMouseLeave?: MouseEventHandler;
};
