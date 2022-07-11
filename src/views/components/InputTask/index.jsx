import React, {useLayoutEffect, useRef, useState} from 'react';

import styles from './index.module.scss';

export const InputTask = ({
  id,
  title,
  onDone,
  onRemove,
  onEdited,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef(null)

  useLayoutEffect(() => {
    if (isEditMode && editTitleInputRef) {
      editTitleInputRef.current.focus()
    }
  })

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
            type="checkbox"
            checkbox={checked}
            className={styles.inputTaskCheckbox}
            onChange={(event) => {
              setChecked(event.target.checked)
              setTimeout(() => {
                onDone(id);
              }, 300)
            }}
        />
        {isEditMode ? (
          <input 
            value={value}
            ref = {editTitleInputRef}
            className={styles.inputTaskTitleEdit}
            onChange={(event) => {
              setValue(event.target.value)
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          onClick={() => {
            // setEditMode(!isEditMode);
            onEdited(id, value);
            setEditMode(false)
          }}
          aria-label="Edit"
          className={styles.inputTaskEdit}
        />
      ) : (
        <button
          onClick={() => {
            setEditMode(!isEditMode);
          }}
          aria-label="Save"
          className={styles.inputTaskSave}
        />
      )}
      
      <button
        onClick={() => {
            if (confirm("Are you sure?")) {
              onRemove(id);
            }
        }}
        aria-label="Remove"
        className={styles.inputTaskRemove}
      />
    </div>
  );
}

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/