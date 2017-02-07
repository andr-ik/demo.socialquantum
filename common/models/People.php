<?php

namespace common\models;

use common\models\query\PeopleQuery;
use Yii;

/**
 * This is the model class for table "{{%people}}".
 *
 * @property integer $id
 * @property string $name
 * @property string $phone
 * @property integer $country_id
 * @property string $created_at
 * @property string $updated_at
 * @property integer $is_active
 *
 * @property Country $country
 */
class People extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%people}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'phone'], 'required'],
            [['country_id', 'is_active'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
            [['name'], 'string', 'max' => 255],
            [['phone'], 'string', 'max' => 14],
            [['country_id'], 'exist', 'skipOnError' => true, 'targetClass' => Country::className(), 'targetAttribute' => ['country_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'phone' => 'Phone',
            'country_id' => 'Country ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'is_active' => 'Is Active',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCountry()
    {
        return $this->hasOne(Country::className(), ['id' => 'country_id']);
    }

    /**
     * @inheritdoc
     * @return PeopleQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new PeopleQuery(get_called_class());
    }

    public function fields()
    {
        return [
            'id',
            'name',
            'phone',
            'country',
        ];
    }
}
