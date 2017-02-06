<?php

namespace console\migrations;

class m130524_201443_country_data extends Migration
{
    public $table = '{{%country}}';

    public function up()
    {
        $lang = 0; // Russian
        $headerOptions = [
            'http' => [
                'method' => "GET",
                'header' => "Accept-language: en\r\n" .
                            "Cookie: remixlang=$lang\r\n"
            ]
        ];
        $methodUrl = 'http://api.vk.com/method/database.getCountries?v=5.5&need_all=1&count=1000';
        $streamContext = stream_context_create($headerOptions);
        $json = file_get_contents($methodUrl, false, $streamContext);
        $arr = json_decode($json, true);
        echo 'Total countries count: ' . $arr['response']['count'] . ' loaded: ' . count($arr['response']['items']);
        $this->batchInsert($this->table, ['vk_id', 'title', 'is_active'], array_map(function($item){
            return [
                $item['id'],
                $item['title'],
                '1'
            ];
        }, $arr['response']['items']));
    }

    public function down()
    {
        $this->truncateTable($this->table);
    }
}
